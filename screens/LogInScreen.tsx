import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../store/store";
import { signIn } from "../store/reducer/logInSlice";

import Loader from "../components/Loader";
import Eye from "../svgs/Eye";

export interface IForm {
  login?: string;
  password?: string;
}

export default function LogInScreen({ navigation }: any) {
  const { loading } = useAppSelector((state) => state.logInSlice);
  const [showPass, setShowPass] = useState<boolean>(true);
  const { handleSubmit, control, watch } = useForm();

  const dispatch = useAppDispatch();
  const { login, password } = watch();

  const onSubmit = useCallback(
    async (data: IForm) => {
      try {
        await dispatch(signIn(data)).unwrap();
        navigation.navigate("Main");
      } catch (e) {
        console.log(e);
      }
    },
    [signIn]
  );

  return (
    <SafeAreaView style={[styles.container, styles.marginLR]}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={[styles.logo, styles.marginLR]}
        />
        <Text style={[styles.sigInText, styles.marginLR]}>
          Войти в личный кабинет
        </Text>
        <View style={styles.inputs}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.username}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Логин или номер телефона"
              />
            )}
            name="login"
            rules={{ required: true }}
          />

          <View style={styles.passBlock}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.passWord, styles.marginLR]}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  secureTextEntry={showPass}
                  placeholder="Пароль"
                />
              )}
              name="password"
              rules={{ required: true }}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Eye />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={
              login && password
                ? {
                    ...styles.btn,
                    backgroundColor: "#747487",
                    ...styles.marginLR,
                  }
                : [styles.btn, styles.marginLR]
            }
            onPress={handleSubmit(onSubmit)}
          >
            {loading ? (
              <Loader title={"loading..."} />
            ) : (
              <Text
                style={
                  login && password
                    ? { ...styles.btn.text, color: "white" }
                    : styles.btn.text
                }
              >
                Войти
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.forget, styles.marginLR]}>
          <Text style={{ color: "#727272" }}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Register, styles.marginLR]}>
          <Text style={styles.dontHaveAcc}>Нет учетной записи?</Text>
          <Text style={styles.registerText}>Зарегистрируйтесь</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 208,
    height: 127,
  },
  sigInText: {
    fontSize: 20,
    height: 28,
    marginTop: 60,
    fontFamily: "bold",
    lineHeight: 25,
  },
  inputs: {
    width: 356,
  },
  username: {
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
    color: "#727272",
    marginTop: 70,
    paddingLeft: 16,
  },
  passBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
    marginTop: 30,
  },
  passWord: {
    color: "#727272",
    width: 300,
    paddingTop: 4,
  },
  btn: {
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#C9C9C9",
    borderRadius: 5,
    width: 323,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    text: { color: "black", fontFamily: "Medium", lineHeight: 20 },
  },
  forget: {
    marginTop: 25,
  },
  Register: {
    marginTop: 89,
  },
  dontHaveAcc: {
    color: "#727272",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Light",
    lineHeight: 24,
  },
  registerText: {
    color: "#747487",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Medium",
    fontWeight: "500",
  },
  marginLR: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});
