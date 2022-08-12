import classes from './eventSummary.module.scss';

export default function EventSummary(props) {
  const { title } = props;

  return (
    <section className={classes.summary_wrapper}>
      {/* <div className={classes.title_wrapper}> */}
      <h1>{title}</h1>
      {/* </div> */}
    </section>
  );
}
