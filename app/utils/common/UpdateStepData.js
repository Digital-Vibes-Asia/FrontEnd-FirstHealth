
const RetreiveData = (
  step1Red,
  step2Red,
  step3Red,
  setRedux,
  userData,
  registerData,
  check1,
  check2
) => {
    console.log(check1,check2,'update register data ')
  if (check1 == "" || !check1)
    setRedux(
      step1Red({
        first_name: registerData?.first_name,
        last_name: registerData?.last_name,
        ic_number: `${registerData?.ic_number}`,
        race: registerData?.race,
        dob: registerData?.dob,
        phone_number: registerData?.phone_number,
        nationality: registerData?.nationality,
        male: registerData?.gender == 0,
        female: registerData?.gender == 1,
      })
    );
  if (check2 == "" || !check2)
    setRedux(
      step2Red({
        address: registerData?.address,
        address2: registerData?.address2,
        postcode: registerData?.postcode,
        city: registerData?.city,
        state: registerData?.state,
        country: registerData?.country,
      })
    );
  setRedux(
    step3Red({
      allergic_medication_list: registerData?.allergic_medication_list,
      heart_problems: registerData?.heart_problems,
      diabetes: registerData?.diabetes,
      allergic: registerData?.allergic,
    })
  );
};

export { RetreiveData };
