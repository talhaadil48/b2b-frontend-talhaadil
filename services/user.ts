import api from "@/lib/axios";

export const get_product_by_user_id = (user_id: number) => {
  return api.get(`/user/user-product_data/${user_id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getCurrentLevel = () => {
  return api.get(`/verification/current-partnership`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getAvaliableLevels = () => {
  return api.get(`/verification/available-partnerships`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const markUserAsLateral = (isLateral: boolean) => {
  return api.post(`/user/user-lateral?is_lateral=${isLateral}`, null, {
    headers: {
      requiresAuth: true,
    },
  });
};
export const getUserRegistrationSelected = () => {
  return api.get(`/user/registration-selected`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getRegistrationAgreement = () => {
  return api.get(`/registration/agreement`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updateRegistrationAgreementUrl = (data: {
  partnership_level: string;
  agreement_url: string;
}) => {
  return api.put(
    `/registration/agreement-url/${data.partnership_level}`, // include path param
    {}, // body is empty
    {
      headers: {
        requiresAuth: true,
      },
      params: {
        agreement_url: data.agreement_url, // query param
      },
    }
  );
};

export const updatePartnership = (partnership_level: string) => {
  return api.post(
    `/verification/update-partnership`,
    {}, // empty body
    {
      headers: {
        requiresAuth: true,
      },
      params: {
        partnership_level,
      },
    }
  );
};

export const deactivatePartnership = (data: {
  partnership_level: string;
  deactivation_reason: string;
}) => {
  return api.post(`/user/deactivate-partnership`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const postFirst = () => {
  return api.post(`/user/first-register?is_first_register=true`, null, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getRejectedUser = (userId: number) => {
  return api.post(`/user/rejected/${userId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};
