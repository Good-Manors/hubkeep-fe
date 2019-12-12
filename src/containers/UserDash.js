import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import Header from '../components/Header/Header';
import Menu from '../components/Menu';
import useModal from '../hooks/useModal';
import styles from './UserDash.css';
import { getAllHomes, getHome } from '../services/homes';
import { setHome } from '../actions/homeActions';
import icon from '../assets/icons/custom-drawer-icon.png';

const UserDash = () => {
  const { isShowing, toggle } = useModal();
  const [userHomes, setHomes] = useState();
  const [redirect, setRedirect] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    getAllHomes()
      .then(homes => {
        setHomes(homes);
      });
  }, []);

  const handleHomeClick = (id) => {
    getHome(id)
      .then(home => {
        dispatch(setHome(home));
        setRedirect(true);
      });
  };

  if(redirect) return <Redirect to='/home' />;


  if(!userHomes) return <h1>Loading</h1>;
  const mappedHomes = userHomes.map(home => {
    return <div className={styles.homeDisplay} key={home._id} onClick={() => handleHomeClick(home._id)}>
      <img src={icon} />
      <p>{home.title}</p>
    </div>;
  });


  return (
    <section className={styles.UserDash}>
      <Header />
      <Menu />
      <section className={styles.UserDashWrapper}>
        <h2>Dashboard</h2>
        <button className={styles.buttonDefault} onClick={toggle}>+ New Home</button>
        <section className={styles.homeSection}>
          {mappedHomes}
        </section>
        <Modal
          isShowing={isShowing}
          hide={toggle}
        />
      </section>
    </section>
  );
};

export default UserDash;
