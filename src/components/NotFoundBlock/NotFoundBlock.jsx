import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <h1 className={styles.notFound}>
      <span>😕</span>
      <br />
      Ничего не найдено...
    </h1>
  );
};
export default NotFoundBlock;
