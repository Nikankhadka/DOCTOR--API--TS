export interface userInput{
    
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password: string
 }

 export interface medicineInput{
    genericName: {
        type: String,
        
      },
      brand: 
        {
        
          brandDose: {
            type: String,
            
          },
          formulation: {
            type: String,
           
        },
    
      basic: {
        usagePharmacologicCategory: {
          type: String
        },
        adultDosing: {
          type: String
         
        },
        pediatricsDosing: {
          type: String
          
        },
        renalAdjustedDosing: {
          type: String
          
        },
        hepaticDosing: {
          type: String
         
        },
        administration: {
          type: String
          
        },
        pregnancyRiskFactor: {
          type: String
          
        },
        breastfeedingConsiderations: {
          type: String
          
        },
        contradication: {
          type: String
          
        },
        adverseEffects: {
          type: String
         
        },
        pharmacology: {
          type: String
          
        },
        drugInteractions: {
          type: String
          
        },
      },
 }
};