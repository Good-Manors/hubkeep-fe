import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Menu from '../components/Menu';
import styles from './DrawerPage.css';
import CardList from '../components/Card/CardList';
import { getFirstHome } from '../services/homes';
import { setHome } from '../actions/homeActions';
import { getDrawers } from '../selectors/homeSelectors';

const DrawerPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getFirstHome()
      .then(home => {
        dispatch(setHome(home));
      });
  }, []);

  const { drawerId } = useParams();
  const drawers = useSelector(getDrawers);

  if(!drawers) return <h1>Loading</h1>;

  let drawerName;

  for(let i = 0; i < drawers.length; i++) {
    if(drawers[i]._id === drawerId) drawerName = drawers[i].name;
  }

  return (
    <section id='drawer-page-wrapper' className={styles.DrawerPageWrapper}>
      <Header />
      <Menu />
      <section className={styles.CardListWrapper}>
        <h2>{drawerName}</h2>
        <CardList drawer={drawerId || ''} />
      </section>
    </section>
  );

};

export default DrawerPage;
