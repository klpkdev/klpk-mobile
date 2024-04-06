import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IOption} from 'react-native-modal-selector';
import Button from '../../components/Button';
import {WriteCard} from '../../components/Card';
import Chapter from '../../components/Chapter';
import {
  IconBack,
  IconChecked,
  IconClose,
  IconGallery,
  IconWrite,
} from '../../components/Icons';
import Select from '../../components/Select';
import {useCategories} from '../../services/categories/query';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './styles';
import {useForm} from 'react-hook-form';
import InputControl from '../../components/InputControl';
import {
  useMyBookCreate,
  useMyBookCover,
  useMyBookUpdate,
  useMyBookChapterCreate,
  useMyBookChapterUpdate,
  useMyBookPublish,
  useMyBookComplete,
} from '../../services/my-books/mutation';
import {
  alertError,
  alertSuccess,
  checkByteSize,
  onError,
} from '../../utils/commons';
import {
  useGetInfiniteMyBook,
  useMyBookChapterDetail,
  useMyBookDetail,
} from '../../services/my-books/query';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import InputRichEditorControl from '../../components/InputRichEditorControl';
import MyModal from '../../components/MyModal';
import FlatListLayout from '../../components/FlatListLayout';
import {IParams} from '../../interfaces/mybooks';

const schema = yup
  .object({
    title: yup.string().required('Judul Tidak boleh kosong'),
    synopsis: yup.string().required('Sinopsis Tidak boleh kosong'),
  })
  .required();

const schemaChapter = yup
  .object({
    name: yup.string().required('Judul Tidak boleh kosong'),
    content: yup.string().required('body Tidak boleh kosong'),
  })
  .required();

const WriteScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>({});
  const [selectedChapter, setSelectedChapter] = useState<any>({});
  const [bottomSheetActive, setBottomSheetActive] = useState(1);
  const [result, setResult] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const [category, setCategory] = useState<IOption>({key: '', label: ''});
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control: controlChapter,
    handleSubmit: handleSubmitChapter,
    reset: resetChapter,
    setValue: setValueChapter,
    formState: {errors: errorsChapter},
  } = useForm({
    resolver: yupResolver(schemaChapter),
  });
  const {data: categories} = useCategories();
  const {
    data: infinitBooks,
    fetchNextPage,
    refetch,
    isLoading: loadingBooks,
  } = useGetInfiniteMyBook({
    params: {limit: 9},
    pageParam: 2,
  });
  const {data: myBooksDetail, refetch: refetchDetail} = useMyBookDetail(
    selectedBook?.id,
  );
  const {data: chapterDetail} = useMyBookChapterDetail(
    selectedBook?.id,
    selectedChapter?.id,
    selectedBook?.id !== undefined && selectedChapter?.id !== undefined,
  );
  const mutation = useMyBookCreate();
  const mutationUpdate = useMyBookUpdate();
  const mutationPublish = useMyBookPublish();
  const mutationChapter = useMyBookChapterCreate();
  const mutationChapterUpdate = useMyBookChapterUpdate();
  const mutationCover = useMyBookCover();
  const mutationCompleted = useMyBookComplete();

  const listOptions = useMemo(() => {
    return categories?.data.map((item: {id: string; name: string}) => ({
      key: item.id,
      label: item.name,
    }));
  }, [categories?.data]);

  const snapPoints = useMemo(() => ['25%', '95%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const onSubmit = (data: any) => {
    setIsloading(true);
    if (selectedBook.id) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  const onSubmitChapter = (data: any) => {
    if (selectedChapter.id) {
      handleUpdateChapter(data);
    } else {
      handleCreateChapter(data);
    }
  };

  const handleCreateChapter = (data: any) => {
    data['bookId'] = selectedBook.id;
    mutationChapter.mutate(data, {
      onSuccess: async (res: any) => {
        setIsloading(false);
        refetch();
        refetchDetail();
        setSelectedChapter(res.data);
        alertSuccess(`${data.name} berhasil ditambahkan`);
      },
      onError: (error: any) => {
        onError(error);
        setIsloading(false);
      },
    });
  };

  const handleUpdateChapter = (data: any) => {
    data['bookId'] = selectedBook.id;
    data['chapterId'] = selectedChapter.id;
    mutationChapterUpdate.mutate(data, {
      onSuccess: async (res: any) => {
        setIsloading(false);
        refetch();
        refetchDetail();
        alertSuccess(`${data.name} berhasil ubah`);
      },
      onError: (error: any) => {
        onError(error);
        setIsloading(false);
      },
    });
  };

  const handleCreate = (data: any) => {
    data['categoryId'] = category.key;
    mutation.mutate(data, {
      onSuccess: async (res: any) => {
        setSelectedBook(res?.data);
        alertSuccess(`Buku ${data.title} berhasil ditambahkan`);
        if (result) {
          const dataSend = new FormData();
          dataSend.append('File', result[0 as keyof object]);
          mutationCover.mutate(
            {bookId: res.data.id, file: dataSend},
            {
              onError: error => {
                onError(error);
                setIsloading(false);
              },
              onSuccess: res => {
                setIsloading(false);
                refetch();
                alertSuccess(`Buku ${data.title} berhasil ditambahkan cover`);
              },
            },
          );
        } else {
          setIsloading(false);
          refetch();
          alertSuccess(`Buku ${data.title} berhasil ditambahkan`);
        }
      },
      onError: error => {
        onError(error);
        setIsloading(false);
      },
    });
  };

  const handleUpdate = (data: any) => {
    data['categoryId'] = category.key;
    data['bookId'] = selectedBook.id;
    mutationUpdate.mutate(data, {
      onSuccess: async (res: any) => {
        if (result) {
          const tempFile = result[0 as keyof object] as any;
          const dataSend = new FormData();
          dataSend.append('File', {
            filename: tempFile?.name,
            name: tempFile?.name,
            type: tempFile?.type,
            uri: tempFile?.uri,
          });
          mutationCover.mutate(
            {bookId: selectedBook.id, file: dataSend},
            {
              onSuccess: res => {
                setIsloading(false);
                refetch();
                alertSuccess(`Buku ${data.title} berhasil ubah`);
              },
              onError: (error: any) => {
                onError(error);
                setIsloading(false);
              },
            },
          );
        } else {
          setIsloading(false);
          refetch();
          alertSuccess(`Buku ${data.title} berhasil ubah`);
        }
      },
      onError: error => {
        onError(error);
        setIsloading(false);
      },
    });
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const handleFileUpload = async () => {
    DocumentPicker.pick({
      type: types.images,
    })
      .then(data => {
        if (checkByteSize(data?.[0]?.size as number)) {
          alertError('File terlalu besar. Maksimal ukuran file hanya 2MB');
        } else {
          setResult(data);
        }
      })
      .catch(handleError);
  };

  const renderImage = () => {
    if (result) {
      if (result[0 as keyof object]['uri']) {
        return (
          <Image
            source={{uri: result[0 as keyof object]['uri']}}
            resizeMode="cover"
            style={{width: 100, height: 100}}
          />
        );
      } else {
        return <IconGallery />;
      }
    } else {
      if (selectedBook.cover) {
        return (
          <Image
            source={{uri: selectedBook.cover}}
            resizeMode="cover"
            style={{width: 100, height: 100}}
          />
        );
      } else {
        return <IconGallery />;
      }
    }
  };

  const handleCardPress = (item: any) => {
    setSelectedBook(item);
    setValue('title', item.title);
    setValue('synopsis', item.synopsis);
    setCategory({key: item.category.id, label: item.category.name});
    handlePresentModalPress();
  };

  const handleOpenBottomSheet = () => {
    setSelectedBook({});
    reset();
    setCategory({key: '', label: ''});
    handlePresentModalPress();
  };

  const handleBottomSheetActive = (active: number) => {
    setBottomSheetActive(active);
  };

  const handleEditChapter = (item: any) => {
    setSelectedChapter(item);
  };

  const handleAddChapter = () => {
    resetChapter();
    setSelectedChapter({});
    setValueChapter('name', '');
    setValueChapter('content', '');
  };

  const handlePublish = () => {
    mutationPublish.mutate(selectedBook.id, {
      onSuccess: () => {
        setModalVisible(true);
      },
      onError: error => {
        onError(error);
      },
    });
  };

  const handleCompletedBook = () => {
    mutationCompleted.mutate(selectedBook.id, {
      onSuccess: () => {
        setModalVisible(true);
      },
      onError: error => {
        onError(error);
      },
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedBook({});
    setSelectedChapter({});
    reset();
    resetChapter();
    setValueChapter('name', '');
    setValueChapter('content', '');
    handleDismissModalPress();
    setResult(null);
    setSelectedBook({});
  };

  useEffect(() => {
    if (chapterDetail) {
      setValueChapter('name', chapterDetail.data?.name);
      setValueChapter('content', chapterDetail.data?.content);
      handleBottomSheetActive(2);
    }
  }, [chapterDetail]);

  return (
      <FlatListLayout
        style={styles.parent}
        refreshControl={
          <RefreshControl
            refreshing={loadingBooks}
            onRefresh={() => refetch()}
          />
        }
        data={infinitBooks?.pages.flatMap(page => page.data)}
        listHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Menulis</Text>
            <TouchableOpacity
              style={styles.buttonNew}
              onPress={handleOpenBottomSheet}>
              <IconWrite color="#D6B16D" />
              <Text style={styles.buttonNewText}>Tulis Baru</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={<View style={styles.footer} />}
        renderItem={(item: any) => {
          return (
            <WriteCard
              key={`item-${item.item.id}`}
              {...item.item}
              synopsis={item.item.synopsis
                .replace(/(<([^>]+)>)/gi, '')
                .replace(/\&nbsp;/g, '')}
              onPress={() => handleCardPress(item.item)}
            />
          );
        }}
        onEndReached={() => {
          fetchNextPage();
        }}>
        <MyModal
          isVisible={isModalVisible}
          buttonPress={handleModalClose}
          buttonText="Mengerti"
          title="Berhasil"
          message="Cerita Anda kan di review oleh Admin"
          icon={<IconChecked width={68} height={68} />}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          handleStyle={styles.handleStyle}
          handleHeight={0}>
          {bottomSheetActive == 1 ? (
            <View style={styles.bottomSheet}>
              <View style={styles.bottomSheetHeader}>
                <TouchableOpacity
                  style={styles.bottomSheetActionLeft}
                  onPress={() => {
                    handleDismissModalPress();
                    setResult(null);
                    setSelectedBook({});
                  }}>
                  <IconClose />
                </TouchableOpacity>
                <Text style={styles.bottomSheetHeaderTitle}>Menulis</Text>
                <TouchableOpacity
                  style={styles.bottomSheetActionRight}
                  onPress={() => {
                    if (selectedBook.id) {
                      handleAddChapter();
                      handleBottomSheetActive(2);
                    } else {
                      alertError('Harus membuat buku terlebih dahulu');
                    }
                  }}>
                  <Text style={styles.textNext}>Lanjut</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={myBooksDetail?.data?.chapters}
                ListHeaderComponent={() => (
                  <>
                    <View style={styles.containerUpload}>
                      <View style={styles.uploadImage}>
                        {renderImage()}
                        <TouchableOpacity
                          style={styles.buttonUploadImage}
                          onPress={handleFileUpload}>
                          <Text style={styles.buttonUploadImageText}>
                            Edit Cover
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <InputControl
                        control={control}
                        errors={errors}
                        feild="title"
                        inputProps={{placeholder: 'Masukan judul buku kamu'}}
                        label="Judul"
                      />
                      <Select
                        style={{padding: 30}}
                        label="Kategori"
                        placeholder="Pilih Kategori"
                        onSelect={item => setCategory(item)}
                        value={category.label}
                        options={listOptions}
                      />
                      <InputRichEditorControl
                        control={control}
                        errors={errors}
                        label="Sinopsis"
                        feild="synopsis"
                        placeholder="Masukan sinopsis"
                      />
                    </View>
                  </>
                )}
                style={{paddingHorizontal: 20}}
                ListFooterComponent={() => {
                  return (
                    <>
                      <Button
                        outline={true}
                        text="Simpan"
                        disabled={isLoading}
                        style={{marginTop: 26}}
                        isLoading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                      />
                      <Button
                        bgColor="grey"
                        text="Terbitkan"
                        onPress={handlePublish}
                      />
                    </>
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <Chapter
                      key={`chapter-${item?.id}`}
                      title={item.name}
                      number={index + 1}
                      onEdit={() => handleEditChapter(item)}
                    />
                  );
                }}
              />
              {/* <ScrollView>
              <View style={styles.containerUpload}>
                <View style={styles.uploadImage}>
                  {renderImage()}
                  <TouchableOpacity
                    style={styles.buttonUploadImage}
                    onPress={handleFileUpload}>
                    <Text style={styles.buttonUploadImageText}>Edit Cover</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerForm}>
                <InputControl
                  control={control}
                  errors={errors}
                  feild="title"
                  inputProps={{placeholder: 'Masukan judul buku kamu'}}
                  label="Judul"
                />
                <Select
                  style={{padding: 30}}
                  label="Kategori"
                  placeholder="Pilih Kategori"
                  onSelect={item => setCategory(item)}
                  value={category.label}
                  options={listOptions}
                />
                <InputRichEditorControl
                  control={control}
                  errors={errors}
                  label="Sinopsis"
                  feild="synopsis"
                  placeholder="Masukan sinopsis"
                />
                {myBooksDetail?.data?.chapters?.map(
                  (item: any, index: number) => {
                    return (
                      <Chapter
                        key={`chapter-${index}`}
                        title={item.name}
                        number={index + 1}
                        onEdit={() => handleEditChapter(item)}
                      />
                    );
                  },
                )}
                <Button
                  outline={true}
                  text="Simpan"
                  disabled={isLoading}
                  style={{marginTop: 26}}
                  isLoading={isLoading}
                  onPress={handleSubmit(onSubmit)}
                />
                <Button
                  bgColor="grey"
                  text="Terbitkan"
                  onPress={handlePublish}
                />
              </View>
            </ScrollView> */}
            </View>
          ) : (
            <View style={styles.bottomSheet}>
              <View style={styles.bottomSheetHeader}>
                <TouchableOpacity
                  style={styles.bottomSheetActionLeft}
                  onPress={() => {
                    setSelectedChapter({});
                    resetChapter();
                    handleBottomSheetActive(1);
                  }}>
                  <IconBack />
                </TouchableOpacity>
                <Text style={styles.bottomSheetHeaderTitle}>Tambah Bab</Text>
                <TouchableOpacity
                  style={styles.bottomSheetActionRight}
                  onPress={handleAddChapter}>
                  <Text>Tambah</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={{...styles.containerForm, marginTop: 40}}>
                  <InputControl
                    control={controlChapter}
                    errors={errorsChapter}
                    feild="name"
                    inputProps={{placeholder: 'Masukan judul bab kamu'}}
                    label="Judul Bab"
                  />
                  <InputRichEditorControl
                    control={controlChapter}
                    errors={errorsChapter}
                    label="Isi Bab"
                    feild="content"
                    placeholder="Masukan content"
                  />
                  <Button
                    text="Simpan"
                    disabled={isLoading}
                    isLoading={isLoading}
                    full={true}
                    onPress={handleSubmitChapter(onSubmitChapter)}
                  />
                  <TouchableOpacity
                    style={styles.buttonUploadImage}
                    onPress={handleCompletedBook}>
                    <Text style={styles.buttonUploadImageText}>
                      Tandai cerita sudah tamat
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </BottomSheetModal>
      </FlatListLayout>
  );
};

export default WriteScreen;
