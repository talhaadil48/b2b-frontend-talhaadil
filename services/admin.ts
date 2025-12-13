import api from "@/lib/axios";
export const getAllUsers = () => {
  return api.get(`/admin/users`, {
    headers: {
      requiresAuth: true,
    },
  });
}
// GET /admin/registrationinfo/{user_id}
export const getUserInfo = (id: string) => {
  return api.get(`/admin/registrationinfo/${id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// POST /admin/approve-registration/{user_id}
export const approveRegistration = (id: string, data: { status: string; remarks: string }) => {
  return api.post(`/admin/approve-registration/${id}`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getUserProfile = () =>{
    return api.get(`/user/profile`, {
    headers: {
      requiresAuth: true,
    },
  });

}


export const updateProfile = (profileData: any) => {
  return api.put("/user/profile", {
    user_update: {
      email: profileData.contact_email,
    },
    registration_info_update: {
      business_name: profileData.business_name,
      business_legal_structure: profileData.business_legal_structure,
      business_type: profileData.business_type,
      year_established: profileData.year_established,
      business_registration_number: profileData.business_registration_number,
      brand_affiliations: profileData.brand_affiliations,
      website: profileData.website,
      annual_turnover: profileData.annual_turnover,
      gst_number: profileData.gst_number,
      tax_identification_number: profileData.tax_identification_number,
      import_export_code: profileData.import_export_code,
      street_address_1: profileData.street_address_1,
      street_address_2: profileData.street_address_2,
      city: profileData.city,
      state_region: profileData.state_region,
      postal_code: profileData.postal_code,
      country: profileData.country,
      contact_person_name: profileData.contact_person_name,
      contact_email: profileData.contact_email,
      contact_phone: profileData.contact_phone,
      contact_whatsapp: profileData.contact_whatsapp,
      contact_district: profileData.contact_district,
      contact_pin_code: profileData.contact_pin_code,
      contact_state: profileData.contact_state,
      contact_country: profileData.contact_country,
      material_standard: profileData.material_standard,
      quality_level: profileData.quality_level,
      sustainability_level: profileData.sustainability_level,
      service_level: profileData.service_level,
      standards_level: profileData.standards_level,
      ethics_level: profileData.ethics_level,
      certifications: profileData.certifications,
      bank_name: profileData.bank_name,
      account_name: profileData.account_name,
      account_type: profileData.account_type,
      account_number: profileData.account_number,
      ifsc_code: profileData.ifsc_code,
      swift_bis_code: profileData.swift_bis_code,
      iban_code: profileData.iban_code,
    },
  }, {
    headers: {
      requiresAuth: true,
    },
  });
};



export const documentVerified = () =>{
  return api.get(`/admin/document-info`, {
    headers: {
      requiresAuth: true,
    },
  });
}

export const get_product_by_user_id = (user_id:number) => {
  return api.get(`/admin/user-product_data/${user_id}`, {
    headers: {
      requiresAuth: true,
    },
  }); 
};





export const getPartnershipLevels = () => {
  return api.get(`/partnership-levels/`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const createPartnershipLevel = (data: any) => {
  return api.post(`/partnership-levels/`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updatePartnershipLevel = (id: number, data: any) => {
  return api.put(`/partnership-levels/${id}/`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};



// Get Users
export const getDocumentInfo = (userId: number) => {
  return api.get(`/admin/document-info/${userId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};


// Update KPI Score
export const updateKpiScore = (userId: number, kpiScore: number) => {
  return api.patch(`/admin/update-kpi-score`, null, {
    params: {
      user_id: userId,
      kpi_score: kpiScore,
    },
    headers: {
      requiresAuth: true,
    },
  });
};


// Approve Document
export const approveDocument = (document_id: number,status : boolean) => {
  return api.post(
    `/admin/documents/approve`,
    {
      document_id,
      approve: status,
    },
    {
      headers: {
        requiresAuth: true,
        "Content-Type": "application/json",
      },
    }
  );
};



// Get all partnership fees (Admin only)
export const getAllPartnershipFees = () => {
  return api.get(`/admin/partnership-fees/`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Get partnership fees for a specific level group (Admin only)
// level_group: "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "LEVEL_4"
export const getPartnershipFeeByLevel = (level_group: string) => {
  return api.get(`/admin/partnership-fees/${level_group}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Create partnership fees for a level group (Admin only)
export const createPartnershipFee = (data: {
  level_group: string;
  registration_fee: number;
  lateral_fees: {
    "1st": number;
    "2nd": number;
    "3rd": number;
  };
}) => {
  return api.post(`/admin/partnership-fees/`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Update registration fee and/or lateral fees for a level group (Admin only)
export const updatePartnershipFee = (
  level_group: string,
  data: {
    registration_fee?: number;
    lateral_fees?: {
      "1st"?: number;
      "2nd"?: number;
      "3rd"?: number;
    };
  }
) => {
  return api.put(`/admin/partnership-fees/${level_group}`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};
