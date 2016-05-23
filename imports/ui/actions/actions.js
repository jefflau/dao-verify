export function submitForm(form){
  return () => {
    Meteor.call('submitVerifyForm', form, (err, data) => {
      if(err) {
        console.error(err);
      }
      console.log(data)
    })
  }
}
