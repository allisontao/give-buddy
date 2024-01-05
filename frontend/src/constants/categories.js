const categories = [
  {
    name: "Animal Welfare", 
    subcategories: [
      {
        name: "Animal shelters", 
        description: "Facilities that provide temporary housing and care for abandoned, stray, or surrendered animals until they can be adopted into permanent homes or reunited with their owners."
      }, 
      {
        name: "Animal adoption", 
        description: "Focus on facilitating the adoption and rehoming of animals in need of loving homes."
      }, 
      {
        name: "Medical treatments", 
        description: "Providing healthcare services, medications, and therapies to address illnesses, injuries, or overall well-being to animals."
      }, 
      {
        name: "Increasing public awareness", 
        description: "Educate and inform the general population about various animal-related issues, such as responsible pet ownership, conservation efforts, and the importance of animal welfare."
      }, 
      {
        name: "Protection against animal abuse", 
        description: "Implementing measures, laws, and programs to prevent harm and cruelty towards animals, ensuring their well-being and safety."
      }
    ]
  },
  {
    name: "Arts & Culture", 
    subcategories: [
      {
        name: "Art Education", 
        description: "Teaching and learning about various aspects of art, including techniques, history, and appreciation, to foster creativity and artistic skills in students of all ages."
      }, 
      {
        name: "Events", 
        description: "Exhibitions, performances, shows, or gatherings that showcase artistic works and provide opportunities for artists to present their creations to the public."
      }, 
      {
        name: "Museums and galleries", 
        description: "Institutions that collect, preserve, and display artworks and cultural artifacts, allowing the public to engage with and appreciate the artistic, historical, and cultural significance of these objects."
      }
    ]
  },
  {
    name: "Education", 
    subcategories: [
      {
        name: "Schools and education institutions", 
        description: "Establishments where formal education and learning take place, offering structured curriculum and qualified teachers to educate students at various levels, from preschool to higher education."
      }, 
      {
        name: "Scholarships and financial aid", 
        description: "Financial support and resources provided to students to help cover the costs of their education, often awarded based on academic achievement, talent, or financial need."
      }, 
      {
        name: "STEM Education", 
        description: "Focus on Science, Technology, Engineering, and Mathematics subjects, aiming to promote knowledge, skills, and interest in these fields among students to prepare them for careers in science and technology-related industries."
      }, 
      {
        name: "Early childhood and education programs", 
        description: "Initiatives and educational activities designed to support the development and learning of young children, typically before they enter formal schooling, with an emphasis on play-based learning and social development."
      }, 
      {
        name: "Education Access and Equity", 
        description: "These organizations work to ensure equal access to quality education for all, regardless of socioeconomic background, race, or geographic location. They often advocate for policies that promote educational equity."
      }
    ]
  },
  {
    name: "Environment", 
    subcategories: [
      {
        name: "Nature conservation", 
        description: "The preservation, protection, and sustainable management of natural resources, habitats, and ecosystems."
      },
      {
        name: "Animal protection", 
        description: "Efforts and initiatives aimed at safeguarding the welfare and rights of animals, preventing cruelty and abuse, and promoting responsible care and treatment of animals."
      },
      {
        name: "Environmental education and awareness", 
        description: "Focus on educating individuals and communities about environmental issues, sustainable practices, and the importance of protecting the planet's natural resources for present and future generations."
      }, 
      {
        name: "Climate change", 
        description: "The long-term alteration of Earth's climate due to human activities, particularly the increase in greenhouse gas emissions, leading to global warming and significant impacts on weather patterns and ecosystems."
      }
    ]
  },
  {
    name: "Health", 
    subcategories: [
      {
        name: "Patient support and advocacy charities", 
        description: "Providing assistance, resources, and representation for individuals with specific medical conditions or health challenges, aiming to improve their quality of life and promote their rights within the healthcare system."
      }, 
      {
        name: "Health education and awareness charities", 
        description: "Educating the public about various health issues, promoting healthy behaviors, and increasing awareness of preventive measures to improve overall well-being."
      },
      {
        name: "Palliative care", 
        description: "Specialized medical care and support for individuals with serious illnesses, focusing on pain and symptom management, emotional and psychological support, and enhancing the overall quality of life for patients and their families."
      }, 
      {
        name: "Children’s health", 
        description: "Focusing on the unique healthcare needs of children, including medical treatment, research, and support services to ensure their healthy development and well-being."
      }, 
      {
        name: "Healthcare access and equity", 
        description: "Working towards reducing disparities in access to healthcare services, advocating for improved healthcare access and policies that ensure all individuals, regardless of socioeconomic status, have equitable opportunities to receive necessary medical care and treatment."
      }, 
      {
        name: "Hospital Foundations", 
        description: "Supporting and enhancing the mission of hospitals and healthcare institutions and contributing to the overall well-being of patients, families, and the broader healthcare system."
      }, 
      {
        name: "Medical Research", 
        description: "These charities fund medical research to advance our understanding of diseases and develop new treatments, therapies, and medical technologies. They often support scientific research institutions and initiatives."
      }
    ]
  }, 
  {
    name: "Social Services", 
    subcategories: [
      {
        name: "Homelessness and housing assistance", 
        description: "Provide support for homeless individuals and those in need of stable housing and related services."
      }, 
      {
        name: "Youth programs", 
        description: "Providing services and resources to empower and support young people, fostering their personal development, education, and overall well-being."
      }, 
      {
        name: "Rehabilitation centers and addiction services", 
        description: "Centers and services that offer programs and treatments to help individuals recover from substance abuse and other addictions, supporting their journey towards a healthier life."
      }, 
      {
        name: "Disability services", 
        description: "Supporting and empowering people with disabilities, providing resources, accommodations, and advocacy to enhance their inclusion and quality of life."
      }, 
      {
        name: "Food banks and hunger relief", 
        description: "Distributing food and essential supplies to individuals and families facing food insecurity and financial hardship."
      }, 
      {
        name: "Child welfare", 
        description: "Ensuring the safety, well-being, and proper care of children, often providing services for foster care, adoption, and family support."
      }, 
      {
        name: "Domestic violence", 
        description: "Offering support, shelter, and resources to individuals affected by domestic abuse and working to prevent future instances of violence."
      }, 
      {
        name: "Crisis intervention", 
        description: "Providing immediate assistance and support during emergencies or challenging situations, offering a lifeline to those in distress."
      }, 
      {
        name: "Women Support Services", 
        description: "Focusing on empowering women and providing resources, advocacy, and support for various women's issues and challenges."
      }, 
      {
        name: "Elderly services", 
        description: "Catering to the needs of the aging population, offering support, healthcare, and resources to enhance the well-being and independence of seniors."
      }, 
      {
        name: "First Nations Community", 
        description: "Working to support and preserve the culture, rights, and well-being of Indigenous communities, addressing their unique needs and challenges."
      }, 
      {
        name: "Mental wellness", 
        description: "Promoting mental health awareness, offering support, and advocating for better mental health services and resources."
      }, 
      {
        name: "LGBTQ+", 
        description: "Supporting and advocating for the rights and well-being of the LGBTQ+ community, providing resources and fostering inclusivity."
      }, 
      {
        name: "Disaster Relief", 
        description: "Responding to natural disasters and emergencies, offering immediate aid, relief efforts, and support for affected communities."
      }, 
      {
        name: "Veterans", 
        description: "Providing support, resources, and assistance to military veterans who have served their countries, including healthcare, housing, employment, and mental health services."
      }, 
      {
        name: "Immigrant and Refugee Resettlement", 
        description: "These organizations assist newly arrived immigrants and refugees with their initial settlement needs. This includes finding housing, employment, healthcare, and enrolling children in schools."
      }, 
      {
        name: "Legal Aid and Advocacy", 
        description: "These organizations provide legal assistance, representation, and advocacy to individuals and communities, particularly those who may not have the means to access or afford legal services."
      }
    ]
  },
  {
    name: "International Aid", 
    subcategories: [
      {
        name: "Humanitarian Relief and Disaster Response", 
        description: "Providing immediate assistance, including food, shelter, medical care, and other essentials, to populations affected by natural disasters, conflicts, or other emergencies."
      }, 
      {
        name: "Healthcare and Medical Services", 
        description: "Improving healthcare infrastructure, provide medical supplies, and support healthcare workers in underserved regions. They may also focus on disease prevention and treatment."
      }, 
      {
        name: "Education and Literacy", 
        description: "Promoting education by building schools, providing educational materials, and offering scholarships to children and adults in disadvantaged communities."
      }, 
      {
        name: "Clean Water and Sanitation", 
        description: "Ensuring access to safe and clean drinking water, as well as proper sanitation facilities."
      }, 
      {
        name: "Hunger and Food Security", 
        description: "Reducing hunger and malnutrition by distributing food, promoting sustainable agriculture, and helping communities become self-sufficient in terms of food production."
      }, 
      {
        name: "Poverty Alleviation", 
        description: "Alleviating poverty often provide economic opportunities, microloans, job training, and livelihood support to help people lift themselves out of poverty."
      }, 
      {
        name: "Child Welfare and Protection", 
        description: "Protecting the well-being of children, addressing issues such as child labor, child trafficking, child abuse, and ensuring access to education and healthcare for children."
      }
    ]
  },
  {
    name: "Religion",
    subcategories: [
      {
        name: "Christian", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }, 
      {
        name: "Muslim", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }, 
      {
        name: "Jewish", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ]
  }
]

export default categories