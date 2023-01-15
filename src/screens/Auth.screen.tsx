import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Icon, Input, Text } from "@rneui/base";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, SafeAreaView, TextInput, View } from "react-native";
import { AppParamsList } from "../components/Layout.component";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import { useAuthMutation } from "../store/apis/auth.api";
import { useLazyGetUserQuery } from "../store/apis/user.api";
import jwt from "jwt-decode";

const Auth: React.FC<NativeStackScreenProps<AppParamsList, "Auth">> = ({
  navigation,
}) => {
  const { state } = useAppSelector((store) => store.user);
  const { updateUser } = useAppActions();
  const [auth, { isLoading }] = useAuthMutation();
  const [getUser, { isLoading: isUserLoading }] = useLazyGetUserQuery();
  const storageToken = useAsyncStorage("token");
  const [isSecure, setIsSecure] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const login = async () => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJhMTFjM2I5NC0xYTBlLTQ4YWEtODNhMC04ZDMwNWU5ZDkyYTUiLCJlbWFpbCI6ImFkbWluQGFkbWluLnJ1Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjczMzY2MTA4LCJleHAiOjE2NzYwNDQ1MDgsImlhdCI6MTY3MzM2NjEwOCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTEyOSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUxMjkifQ.xKl3cznbSvuxbxAdCb9sT160VDa4qvv6k6cHqnmG-SM";
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0NzBmM2VhYS02NzI2LTQ5NTEtYTc1Zi1lMWIzZmJhMDFiZDUiLCJlbWFpbCI6InVzZXJAdXNlci5ydSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjczMjc3NTUxLCJleHAiOjE2NzU5NTU5NTEsImlhdCI6MTY3MzI3NzU1MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTEyOSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUxMjkifQ.56vksmmLWnmbOKwr1m9GXHG8Qpz3tvg6s3WWWVHUWfc";
    const token = await storageToken.getItem();
    if (!token || token.split(".").length < 3)
      return updateUser({ state: "unauth" });
    const userId = jwt<{ UserID: string }>(token).UserID;
    const userInfo = await getUser({ userId, token })
      .unwrap()
      .catch(console.error);
    // Alert.alert(userInfo ? `Логин за ${userInfo.email}` : "Авторизуйтесь");
    updateUser({ info: userInfo ?? undefined, token, state: "auth" });
  };
  useEffect(() => {
    login();
  }, []);

  const handleSubmit = async () => {
    if (isLogin) {
      const token = await auth({ email, password })
        .unwrap()
        .catch(() => Alert.alert("Ошибка", "При авторизации произошла ошибка"));
      if (!token) return;
      const userId = jwt<{ UserID: string }>(token).UserID;
      const userInfo = await getUser({ userId, token })
        .unwrap()
        .catch(console.error);
      updateUser({ info: userInfo ?? undefined, token, state: "auth" });
      storageToken.setItem(token);
    } else {
    }
    // console.log(email);
    // console.log(password);
    // console.log(password2);
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
