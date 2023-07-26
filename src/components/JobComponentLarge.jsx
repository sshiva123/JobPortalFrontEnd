import { StyleSheet,Dimensions, Text, View,Image,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector,useDispatch } from 'react-redux';
import address from '../../address';
import { savedJobs } from '../store/slices/userSlice';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dummyJob={
  "title": "Full Stack Developer",
  "description": "We are looking for a full stack developer who can work on both front-end and back-end technologies. You will be responsible for developing and maintaining web applications using HTML, CSS, JavaScript, Node.js, MongoDB, and other frameworks. You will also collaborate with other developers and designers to ensure high-quality and user-friendly products.",
  "type": "Full-time",
  "job_posted_date": "2023-05-01",
  "job_expiry_date": "2023-06-01",
  "company_id": "641c5f684feb9daab9b7871c",
  "location": {
      "country": "Nepal"
  },
  "category": "Information Technology",
  "designation": "Senior Developer",
  "skills": [
      {
          "name": "Front-end",
          "skills": ["HTML", "CSS", "JavaScript", "React", "Bootstrap"]
      },
      {
          "name": "Back-end",
          "skills": ["Node.js", "Express", "MongoDB", "RESTful API"]
      }
  ],
  "benefits": ["Flexible hours", "Remote work", "Health insurance"],
  "salary": {
      "currency": "NPR",
      "value": 100000
  },
  "job_applications": [
      {
          "applicant_id": "5e9f4a2b6c8f4c3a8c7f9d78",
          "description": "I have 3 years of experience as a full stack developer. I have worked on various projects using the technologies you require. I am passionate about web development and eager to learn new skills.",
          "submission_date": "2023-05-05",
          "application_status": "Pending"
      },
      {
          "applicant_id": "5e9f4a2b6c8f4c3a8c7f9d79",
          "description": "I am a fresh graduate with a degree in computer science. I have done some projects using HTML, CSS, JavaScript, and Node.js. I am keen to join your team and grow as a developer.",
          "submission_date": "2023-05-06",
          "application_status": "Rejected"
      }
  ],
  "jobViews": 50
}

const JobComponentLarge= ({navigation,jobData}) => {
  const dispatch=useDispatch();
  let userData=useSelector((state)=>{
   return state.user.userData;
  })
  const [savedJobsData,setSavedJobsData]=useState(userData.savedJobs);
  function saveButton(){
    fetch('http://'+address+':3000/candidates/savedJobs/'+userData._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        savedJobs:jobData._id
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.message=="Success"){
       dispatch(savedJobs(jobData._id));
      }
      
    })
    .catch(error => {
      console.error(error);
    });
  }
  useEffect(()=>{
    setSavedJobsData(userData.savedJobs)
    console.log("saved jobs :"+userData.savedJobs);
  },[userData])
  return (
    <TouchableOpacity style={styles.mainView} onPress={()=>{ navigation.navigate('Jobs',{screen:"JobDisplay",params:{job:jobData}}) }}>
      <View style={styles.topView} >
        <View style={{flex:3,flexDirection:'row',padding:10}}>
            <View style={{flex:1,borderRadius:15,overflow:'hidden'}}>
              <Image style={{flex:1}} source={{uri:jobData.companyData.displayPicture}} />
            </View>
            <View style={{flex:3,marginLeft:10}}>
              <Text style={{fontSize:15,fontWeight:'bold',color:"white"}}>{jobData.title}</Text>
              <Text style={{color:'white'}}>{jobData.designation}</Text>
            </View>
            <TouchableOpacity onPress={()=>{saveButton();}} style={{flex:1,margin:10,alignItems:'flex-end',justifyContent:'center',shadowOffset:0}}>
              {savedJobsData.indexOf(jobData._id)>-1?<>
                <Icon name="bookmark" style={{fontSize:40,color:'tomato'}} />
              <Text style={{color:'tomato'}}>  Saved </Text></>:<><Icon name="bookmark-outline" style={{fontSize:40,color:'white'}} />
              <Text style={{color:'white'}}>   Save  </Text></>}
            </TouchableOpacity>
        </View>
        <View style={{flex:1,flexDirection:'row',marginHorizontal:8}}>
              {jobData.benefits?jobData.benefits.map(data=>{return(<Text style={{borderRadius:20,color:'white',marginHorizontal:2,paddingHorizontal:15,textAlign:'center',textAlignVertical:'center' ,backgroundColor:'#08205c'}} key={data}>{data}</Text>)}):<></> }
        </View>
        <View style={{flex:3,marginHorizontal:10,overflow:'scroll'}}>
          <Text numberOfLines={4} ellipsizeMode='tail' style={{color:'white',textAlign:'justify',fontSize:10}}>{jobData.description}</Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={{flex:1}}><Text style={{color:'white'}}>Posted: {jobData.job_posted_date}</Text></View>
        <View style={{flex:1,alignItems:'flex-end'}}><Text style={{color:'white',fontWeight:'bold',fontSize:12}}>{jobData.salary.currency} {jobData.salary.value} /month</Text></View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        margin:10,
        width:'95%',
        height:windowHeight/4,
        borderWidth:0,
        borderRadius:15,
        borderColor:'gray',
        backgroundColor:'#051336',
        alignSelf:'center',
        overflow:'hidden',
    },
    topView:{
        flex:4
    },
    bottomView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10
    }
})

export default JobComponentLarge;