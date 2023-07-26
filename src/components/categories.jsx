import { StyleSheet,Dimensions, Text, View,Image } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const categoriesData = [
  {
    name: "Accounting and Finance",
    image:require('../assets/images/categories/Accounting.jpg'),
    skills: [
      "Accounting",
      "Auditing",
      "Budgeting",
      "Financial analysis",
      "Financial reporting",
      "Tax preparation",
      "Data analysis",
      "Financial modeling",
      "Risk management",
      "Strategic planning",
      "Other"
    ],
  },
  {
    name: "Administrative Support",
    image:require('../assets/images/categories/administrativeSupport.jpg'),
    skills: [
      "Clerical",
      "Customer service",
      "Data entry",
      "Filing",
      "Office management",
      "Phone calls",
      "Scheduling",
      "Travel arrangements",
      "Microsoft Office Suite",
      "Customer relationship management (CRM) software",
      "Project management software",
      "Social media management","Other"
    ],
  },
  {
    name: "Advertising and Marketing",
    image:require('../assets/images/categories/advertisingMarketing.jpg'),
    skills: [
      "Creativity",
      "Communication",
      "Problem-solving",
      "Research",
      "Writing",
      "Media planning",
      "Public relations",
      "Social media marketing",
      "SEO","Other"
    ],
  },
  {
    name: "Architecture and Engineering",
    image:require('../assets/images/categories/architectureEngineering.jpg'),
    skills: [
      "Design",
      "Drafting",
      "Construction",
      "Mathematics",
      "Physics",
      "Science",
      "Computer-aided design (CAD) software",
      "Building information modeling (BIM) software",
      "Sustainability",
      "Green building",
      "Other"
    ],
  },
  {
    name: "Arts, Design, and Entertainment",
    image:require('../assets/images/categories/artsDesign.jpg'),
    skills: ["Figma","Canva","Illustrator","Color Theorey","Video Editing",
    "Graphic Design",
    "UI/UX Design",
    "Illustration",
    "Photography",
    "Video Editing",
    "Animation",
    "Creative Thinking",
    "Visual Arts",
    "Typography",
    "Color Theory",
    "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
    "Sketching and Drawing",
    "Knowledge of Design Principles",
    "Communication Skills",
    "Other"
    ],
  },
  {
    name: "Customer Service",
    image:require('../assets/images/categories/customerService.jpg'),
    skills: [
      "Communication Skills",
      "Empathy",
      "Problem-solving",
      "Active Listening",
      "Conflict Resolution",
      "Patience",
      "Positive Attitude",
      "Teamwork",
      "Attention to Detail",
      "Time Management",
      "Product Knowledge",
      "Ability to Handle Difficult Customers",
      "Multi-tasking",
      "Adaptability",
      "Other"
    ],
  },
  {
    name: "Education and Training",
    image:require('../assets/images/categories/educationTraining.jpg'),
    skills: ["Mathematics","English","Science","History","Geography","Art","Music",
    "Teaching",
    "Curriculum Development",
    "Lesson Planning",
    "Instructional Design",
    "Assessment and Evaluation",
    "Classroom Management",
    "Communication Skills",
    "Knowledge of Learning Theories",
    "Adaptability",
    "Organization Skills",
    "Technology Integration",
    "Problem-solving",
    "Student Engagement"
    ],
  },
  {
    name: "Management",
    image:require('../assets/images/categories/management.jpg'),
    skills:[ "Leadership",
    "Strategic Planning",
    "Decision-making",
    "Team Management",
    "Project Management",
    "Communication Skills",
    "Financial Acumen",
    "Analytical Skills",
    "Problem-solving",
    "Negotiation",
    "Conflict Resolution",
    "Change Management",
    "Performance Management",
    "Business Development"

    ]
  },
  {
    name: "Healthcare",
    image:require('../assets/images/categories/healthcare.jpg'),
    skills:["MBBS","MD","Doctor","Dentist","Nurse","EMT","Pharmacist","Therapist","Laboratory","Radiographers","Other"]
    
  },
  {
    name: "Human Resources",
    image:require('../assets/images/categories/humanResources.jpg'),
    skills: [
      "Talent Acquisition",
      "Employee Relations",
      "Training and Development",
      "Compensation",
      "Benefits",
      "Communication",
      "Empathy",
      "Problem Solving",
      "Teamwork",
      "Other"
    ],
  },
  {
    "name": "Software Development",
    "image": require('../assets/images/categories/softwareDevelopment.jpg'),
    "skills": [
      "Java",
      "Python",
      "C++",
      "JavaScript",
      "HTML",
      "CSS",
      "React",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "Ruby",
      "Ruby on Rails",
      "PHP",
      "Laravel",
      "ASP.NET",
      "C#",
      "Spring Boot",
      "Hibernate",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
      "Objective-C",
      "TypeScript",
      "jQuery",
      "Bootstrap",
      "WordPress",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Oracle",
      "SQLite",
      "Microsoft SQL Server",
      "Firebase",
      "Elasticsearch",
      "Redis",
      "Git",
      "SVN",
      "Maven",
      "Gradle",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "AWS",
      "Azure",
      "Google Cloud",
      "Heroku",
      "Apache Kafka",
      "RabbitMQ",
      "GraphQL",
      "RESTful API",
      "SOAP",
      "OAuth",
      "JSON",
      "XML",
      "JUnit",
      "Selenium",
      "Jest",
      "Cucumber",
      "Agile Methodologies",
      "Scrum",
      "Test-Driven Development (TDD)",
      "Continuous Integration and Deployment (CI/CD)",
      "DevOps",
      "Microservices",
      "Containerization",
      "Data Structures",
      "Algorithms",
      "Object-Oriented Programming (OOP)",
      "Functional Programming",
      "Design Patterns",
      "Software Development Life Cycle (SDLC)",
      "Problem-solving",
      "Debugging and Troubleshooting",
      "Code Review",
      "Collaboration and Teamwork"
    ]
  },
  
  {
    name: "Information Technology",
    image:require('../assets/images/categories/informationTechnology.jpg'),
    skills: [ "Computer Science", "Technology Certification", "Professional Membership", "Technical and Analytical Skills", "Troubleshooting and Problem Solving", "Independent and Team Work", "Communication Skills","Microsoft Word","PowerPoint", "Learning and Adaptability","Other" ]
  },
  {
    name: "Legal",
    image:require('../assets/images/categories/legal.jpg'),
    skills:[ "Law", "Legal Research", "Legal Writing", "Litigation", "Contract Drafting", "Negotiation", "Mediation", "Arbitration", "Compliance", "Corporate Governance", "Intellectual Property", "Criminal Justice", "Family Law", "Tax Law", "Environmental Law", "Human Rights", "LexisNexis", "Westlaw","Other" ]

  },
  {
    name: "Logistics and Supply Chain",
    image:require('../assets/images/categories/logistics.jpg'),
    skills: [ "Supply Chain Management", "Logistics", "Inventory Management", "Procurement", "Sourcing", "Warehousing", "Distribution", "Transportation", "Operations Management", "Customer Service", "Forecasting", "Planning", "Analysis", "Optimization", "ERP", "SAP", "Oracle", "Excel", "Power BI", "Tableau","Other" ]
  },
  {
    name: "Manufacturing",
    image:require('../assets/images/categories/manufacturing.jpg'),
    skills: [ "Engineering", "Design", "Production", "Quality Control", "Lean Manufacturing", "Six Sigma", "Kaizen", "5S", "Continuous Improvement", "Safety", "Maintenance", "Troubleshooting", "Machining", "Welding", "Assembly", "CAD", "SolidWorks", "AutoCAD", "PLC", "Robotics","Other" ]
  },
 
  {
    name: "Non-Profit",
    image:require('../assets/images/categories/nonProfit.jpg'),
    skills:["Other"]
  },
  {
    name: "Sales",
    image:require('../assets/images/categories/sales.jpg'),
    skills: [ "Sales", "Marketing", "Customer Service", "Communication", "Negotiation", "Persuasion", "Product Knowledge", "Presentation", "Closing", "Follow-up", "CRM", "Salesforce", "HubSpot", "Zoho", "Microsoft Office", "Google Workspace", "Social Media", "LinkedIn", "Email Marketing", "SEO" ,"Other"]
  },
  {
    name: "Science and Technology",
    image:require('../assets/images/categories/scienceTechnology.jpg'),
    skills: [ "Biology", "Chemistry", "Physics", "Mathematics", "Statistics", "Data Science", "Machine Learning", "Artificial Intelligence", "Computer Science", "Engineering", "Research", "Analysis", "Experimentation", "Innovation", "Critical Thinking", "Problem Solving", "Python", "R", "Matlab", "TensorFlow","Other" ]
  },
  {
    name: "Security",
    image:require('../assets/images/categories/security.jpg'),
    skills: [ "Security", "Cybersecurity", "Information Security", "Network Security", "Physical Security", "Risk Management", "Compliance", "Audit", "Incident Response", "Forensics", "Ethical Hacking", "Penetration Testing", "Malware Analysis", "Encryption", "Firewall", "VPN", "SIEM", "NIST", "ISO 27001", "CISSP","Other" ]
  },
  {
    name: "Sports and Recreation",
    image:require('../assets/images/categories/sports.jpg'),
    skills: [ "Sports", "Athletics", "Fitness", "Health", "Wellness", "Coaching", "Training", "Teaching", "Mentoring", "Leadership", "Teamwork", "Communication", "Motivation", "Strategy", "Performance", "Analysis", "Feedback", "Nutrition", "Injury Prevention", "Recovery" ,"Other"]
  },
  {
    name: "Travel and Tourism",
    image:require('../assets/images/categories/travel.jpg'),
    skills: [ "Travel", "Tourism", "Hospitality", "Customer Service", "Communication", "Interpersonal Skills", "Multilingual", "Cultural Awareness", "Geography", "History", "Planning", "Organizing", "Booking", "Sales", "Marketing", "Social Media", "Budgeting", "Problem Solving", "Creativity", "Flexibility","Other" ]
  },
  {
    name:"Writing",
    image:require('../assets/images/categories/writing.jpg'),
    skills: [ "Writing", "Editing", "Proofreading", "Grammar", "Spelling", "Punctuation", "Vocabulary", "Style", "Tone", "Voice", "Creativity", "Research", "Analysis", "Critical Thinking", "Storytelling", "Content Creation", "Blogging", "Copywriting", "SEO", "WordPress","Other" ]
  },
  {
    name:"Others",
    image:require('../assets/images/categories/others.jpg'),
    skills:["Other"]
  }
];


const Categories = (props,{navigation}) => {
  console.log("categories is running");
  
  return (
    <>
    {
      categoriesData.map(data=>{
        return(
    <View style={styles.mainView} key={data.name}>
      <View style={styles.topView} >
      <Image style={{flex:1,width:'100%'}} source={data.image} resizeMethod='resize' resizeMode='cover' />
      </View>
      <View style={styles.bottomView}>
        <Text>{data.name}</Text>
      </View>
    </View>);

})
}
    </>
  )
}

const styles = StyleSheet.create({
    mainView:{
        
        marginRight:10,
        overflow:'hidden',
        width:windowWidth/2,
        borderWidth:0,
        borderRadius:10,
        borderColor:'gray',
        backgroundColor:'white'
    },
    topView:{
        flex:3
    },
    bottomView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Categories;