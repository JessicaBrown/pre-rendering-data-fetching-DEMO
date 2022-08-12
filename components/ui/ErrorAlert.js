import classes from './errorAlert.module.scss';

export default  function ErrorAlert(props) {
  return <div className={classes.alert}>{props.children}</div>;
}


