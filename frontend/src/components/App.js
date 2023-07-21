import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import { ApiConst } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import { Auth } from "../utils/Authorization";
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
  const token = localStorage.getItem("JWT_SECRET");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            ApiConst.setToken(token);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    Promise.all([ApiConst.getCards(), ApiConst.getInfoAboutMe()])
      .then(([{ cards }, user]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [isLoggedIn]);

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

    ApiConst
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    ApiConst
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    ApiConst
      .updateProfileData(data)
      .then((res) => { 
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    ApiConst
      .updateProfileAvatar(data)
      .then((res) => {
        return setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    ApiConst
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
    Auth.registrate(email, password)
      .then(() => {
        setInfoTooltipImage(success);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/signin", { replace: true });
      })
      .catch((res) => {
        setInfoTooltipImage(error);
        setInfoTooltipText(res);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleLogin(email, password) {
    Auth.authorizate(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("JWT_SECRET", res.token);
          ApiConst.setToken(res.token);
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
    localStorage.removeItem("JWT_SECRET");
    setEmail("");
    setIsLoggedIn(false);
    navigate("/signin", { replace: true });
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
                  path="/signin"
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
            path="/signup"
            element={
              <>
                <Header text="Вход" path="/signin" />
                <Register onRegister={handleRegistration} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header text="Регистрация" path="/signup" />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isLoggedIn ? "/" : "/signin"}/>
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
