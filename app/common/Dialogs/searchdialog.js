import { View, StyleSheet, TextInput, Pressable, Modal, Alert, ActivityIndicator } from 'react-native';
import { useEffect, useState, useReducer } from 'react';
import { CustomColors } from '../../utils/common/CustomColors';
import SearchInputBox from '../../common/textbox/searchinputbox';
import DoctorListCard from '../../screens/SummmaryCards/doctorlistcard';
import { UrlBase } from '../../utils/common/urlbase';
import { usePostMutation, useGetQuery } from '../../store/api';
import { jsiConfigureProps } from 'react-native-reanimated/lib/typescript/reanimated2/core';

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default function SearchDialog({ dialogStatus, setdialogStatus, click }) {

  const [formState, dispatch] = useReducer(SearchReducer, {
    text: "",
    recentlist: [],
    searchlist: [],
    progressBar: true,
    page: 1,
    pagination: true,
    
  });

  

  const [SearchDoctor, { data:searchdata, isLoading:searchloading, isError:searchiserror, isSuccess:searchsuccess, error:searcherror }] =
    usePostMutation();

    console.log(JSON.stringify(searchdata)+ ' Search Data')

  

    const { data: RSdata, error: RSerror, isLoading: RSloading, isSuccess: RSsuccess, refetch:RecentRefetch } = useGetQuery(UrlBase.RECENT_SEARCH);

    console.log(JSON.stringify(RSdata)+ ' Rs Data')


    // const { data:RSdata, error:RSerror, isLoading:RSloading } = useQuery(['yourQueryKey', shouldFetchData], () => {
    //   // Call the API here, using the condition to determine if the call should be made
    //   if (shouldFetchData) {
    //     return yourApi(); // Replace with your actual API call
    //   } else {
    //     // Return a placeholder value or null if the API call should not be made
    //     return null;
    //   }
    // }, {
    //   enabled: shouldFetchData, // Only fetch data if the condition is true
    // });
  


    

    useEffect(()=>{
      console.log("Anbu.....")
   
      RecentRefetch()

    },[dialogStatus])


    useEffect(() => {
      if (RSdata) {
        handleChange({ recentlist: RSdata?.recent_search_doctors, progressBar: false });
      } else if (RSerror) {
        handleChange({ progressBar: false })
        Alert.alert(
          "Error",
          JSON.stringify(searcherror),
        );
      }
  
    }, [RSdata, RSerror]);

   

  useEffect(() => {
    if (searchsuccess) {
      handleChange({ searchlist: [...formState.searchlist, ...searchdata?.data], progressBar: false, pagination: searchdata?.pagination?.has_next });
    } else if (searchiserror) {
      handleChange({ progressBar: false })
      Alert.alert(
        "Error",
        JSON.stringify(searcherror),
      );
    }

  }, [searchdata, searcherror]);

  function handlescroll(event) {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const screenHeight = layoutMeasurement.height;
    const scrollY = contentOffset.y;
    const contentHeight = contentSize.height;

    // Check if the user has scrolled to the bottom and there's more data to load
    if (screenHeight + scrollY >= contentHeight) {
      console.log("here came")
      if (formState.pagination) {
        handleChange({ page: formState.page + 1 });
      }

    }

  }


  function handleSearch() {
    SearchDoctor({
      data: {
        doctor_search: formState.text,
      },
      url: UrlBase.DOCTOR_SEARCH + "?page=" + formState.page,
    });
  }


  const handleChange = fields => {
    dispatch({ type: 'SET_FIELD', fields });
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (formState.text != "") {
        handleSearch()
      }
      else {
        handleChange({ page: 1, searchlist: [], progressBar: false });
      }

    }, 1000);


    return () => clearTimeout(debounceSearch);
  }, [formState.text, formState.page]);


  const recentlist = [
    {
      id: 1,
      uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714435200&semt=ais',
      name: 'Dr.Priya Shri,',
      doctor_id: 1,
      specialist: 'Cardiologist',
    },
    {
      id: 2,
      uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714435200&semt=ais',
      name: 'Dr.Priya Shri,',
      doctor_id: 1,
      specialist: 'Cardiologist',
    },
  ];

  const searchlist = [
    {
      id: 1,
      uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714435200&semt=ais',
      name: 'Dr.Priya Shri,',
      doctor_id: 2,
      specialist: 'Cardiologist',
    },
    {
      id: 2,
      uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714435200&semt=ais',
      name: 'Dr.Priya Shri,',
      doctor_id: 1,
      specialist: 'Cardiologist',
    },
    {
      id: 3,
      uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714435200&semt=ais',
      name: 'Dr.Priya Shri,',
      doctor_id: 1,
      specialist: 'Cardiologist',
    },
  ];

  function Dismiss() {
    setdialogStatus()
    
    handleChange({
      text: "",
      progressBar: false,
      page: 1,
      pagination: true,
    });

  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={dialogStatus}
      keyboardShouldPersistTaps="handled"
      presentationStyle="overFullScreen"
      onDismiss={Dismiss}>
        <View style={styles.whole_container}>
        <View style={styles.viewWrapper}>

        <View style={styles.modalView}>
          <SearchInputBox
            clear={() => {
              handleChange({ text: "", searchlist: [], page: 1, pagination: true });
            }}
             back={Dismiss}
            value={formState.text}
            setvalue={param => {
              handleChange({ text: param, progressBar: true, page: 1, searchlist: [], pagination: true });
            }}></SearchInputBox>

          <DoctorListCard
            text={formState.text}
            handlescroll={handlescroll}
            progressBar={formState.progressBar}
            data={formState.text.length == 0 ? formState.recentlist : formState.searchlist}
            pressed={(data) => {
              Dismiss()
              click(data)
            }}></DoctorListCard>


        </View>


      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 5,
    backgroundColor: CustomColors.white,
    borderRadius: 7,
    padding: 20,

    // alignItems: 'center',
  },
  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,

    fontWeight: 'bold',
  },
  whole_container: { backgroundColor: "#000", flex: 1, opacity:0.9}
});
