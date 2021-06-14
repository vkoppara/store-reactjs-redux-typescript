const logger = (store: any) => (next: any) => (action: any) => {
  //console.log(action.payload);
  next(action);
};
export default logger;
