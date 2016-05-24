import { callMethodPromise } from '../../helpers/helperPromises';

export function submitForm(form){
  return () => {
    callMethodPromise('submitVerifyForm', form).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.error(err);
    })
  }
}
