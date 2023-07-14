import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import {
  registrate,
  authorizate,
  checkToken,
} from "../utils/Authorization";
import success from "../images/success.svg";
import error from "../images/error.svg";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [infoTooltipImage, setInfoTooltipImage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getInfoAboutMe(), api.getCards()])
        .then(([info, cards]) => {
          setCurrentUser(info);
          setCards(cards);
        })
        .catch((err) => console.log(err));
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          console.log(res);
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .updateProfileData(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(email, password) {
    registrate(email, password)
      .then(() => {
        setInfoTooltipImage(success);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/sign-in", { replace: true });
      })
      .catch((res) => {
        setInfoTooltipImage(error);
        setInfoTooltipText(res);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleLogin(email, password) {
    authorizate(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setInfoTooltipImage(err);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  text="Выйти"
                  email={email}
                  onClick={handleSignOut}
                  path="/sign-in"
                />
                <ProtectedRoute
                  element={Main}
                  loggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCard={handleCardClick}
                  onCardDeleteClick={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header text="Вход" path="/sign-in" />
                <Register onRegister={handleRegistration} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header text="Регистрация" path="/sign-up" />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isLoggedIn ? "/" : "/sign-in"}/>
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-confirmation"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          text={infoTooltipText}
          image={infoTooltipImage}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
