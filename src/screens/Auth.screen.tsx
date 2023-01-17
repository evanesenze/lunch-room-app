import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Icon, Input, Text } from "@rneui/base";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, SafeAreaView, TextInput, View } from "react-native";
import { AppParamsList } from "../components/Layout.component";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import { useAuthMutation, useRegisterMutation } from "../store/apis/auth.api";
import { useLazyGetUserQuery } from "../store/apis/user.api";
import jwt from "jwt-decode";

const Auth: React.FC<NativeStackScreenProps<AppParamsList, "Auth">> = ({
  navigation,
}) => {
  const { state } = useAppSelector((store) => store.user);
  const { updateUser } = useAppActions();
  const [auth, { isLoading }] = useAuthMutation();
  const [reg, { isLoading: isRegLoading }] = useRegisterMutation();
  const [getUser, { isLoading: isUserLoading }] = useLazyGetUserQuery();
  const storageToken = useAsyncStorage("token");
  const [isSecure, setIsSecure] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const login = async () => {
    const token = await storageToken.getItem();
    if (!token || token.split(".").length < 3)
      return updateUser({ state: "unauth" });
    const userId = jwt<{ UserID: string }>(token).UserID;
    const userInfo = await getUser({ userId, token })
      .unwrap()
      .catch(console.error);
    updateUser({ info: userInfo ?? undefined, token, state: "auth" });
  };
  useEffect(() => {
    login();
  }, []);

  const handleSubmit = async () => {
    if (!isLogin && password !== password2)
      return Alert.alert("Ошибка", "Пароли не совпадают");
    if (isLogin) {
      const token = await auth({ email, password })
        .unwrap()
        .catch((error) => {
          console.log(error);
          Alert.alert("Упс...", "При авторизации произошла ошибка");
        });
      if (!token) return;
      const userId = jwt<{ UserID: string }>(token).UserID;
      const userInfo = await getUser({ userId, token })
        .unwrap()
        .catch(console.error);
      updateUser({ info: userInfo ?? undefined, token, state: "auth" });
      storageToken.setItem(token);
    } else {
      await reg({ email, password })
        .unwrap()
        .then(() => {
          setIsLogin(true);
          Alert.alert(
            "Успех",
            "Вы успешно зарегистрировались. Теперь подтвердите свою почту"
          );
        });
    }
  };

  useEffect(() => {
    if (state === "auth") navigation.navigate("Home");
  }, [state]);

  if (state === "wait")
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <View style={{ width: "90%" }}>
        <Text h2 style={{ marginBottom: "5%", letterSpacing: 1 }}>
          {isLogin ? "Войти" : "Регистрация"}
        </Text>
        <Input
          label="Email"
          placeholder="Введите ваш Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Пароль"
          secureTextEntry={isSecure}
          placeholder="Введите пароль"
          value={password}
          onChangeText={setPassword}
          rightIcon={
            <Icon
              name={`visibility${isSecure ? "-off" : ""}`}
              onPress={() => setIsSecure((x) => !x)}
            />
          }
        />
        {!isLogin && (
          <Input
            label="Повторите пароль"
            secureTextEntry={isSecure}
            placeholder="Введите пароль"
            value={password2}
            onChangeText={setPassword2}
            rightIcon={
              <Icon
                name={`visibility${isSecure ? "-off" : ""}`}
                onPress={() => setIsSecure((x) => !x)}
              />
            }
          />
        )}
        <Button
          containerStyle={{ borderRadius: 10, marginBottom: "5%" }}
          color="#FF4F5A"
          onPress={handleSubmit}
          loading={isLoading || isUserLoading}
          disabled={
            isLoading ||
            isUserLoading ||
            !email ||
            !password ||
            (!isLogin && !password2)
          }
        >
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </Button>
        <Pressable
          onPress={() =>
            setIsLogin((x) => {
              if (x) setPassword2("");
              return !x;
            })
          }
        >
          <Text style={{ textAlign: "center" }}>
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
