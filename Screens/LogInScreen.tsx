import React, { useCallback, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";

import { signIn } from "../store/reducer/adminSlice";
import { useAppDispatch } from "../store/store";

import Eye from "../svgs/Eye";

export interface IForm {
  login?: string;
  password?: string;
}

export default function LogInScreen({ navigation }: any) {
  const [showPass, setShowPass] = useState<boolean>(true);

  const { handleSubmit, control, watch } = useForm();

  const dispatch = useAppDispatch();
  const { login, password } = watch();

  const onSubmit = useCallback(
    (data: IForm) => {
      dispatch(signIn(data));
      setTimeout(() => {
        checkToken();
      }, 2000);
    },
    [signIn]
  );

  //geratest
  //qweqwe

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return navigation.navigate("Home");
    } else {
      return navigation.navigate("Main");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={70}
        enableResetScrollToCoords={false}
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 208,
            height: 127,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            height: 28,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 60,
          }}
        >
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
                  style={styles.passWord}
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
            style={login && password ? styles.btnActive : styles.btn}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={
                login && password ? styles.btnActive.text : styles.btn.text
              }
            >
              Войти
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 25 }}
        >
          <Text style={{ color: "#727272" }}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 25 }}
        >
          <Text style={{ color: "#727272", fontSize: 19, textAlign: "center" }}>
            Нет учетной записи?
          </Text>
          <Text style={{ color: "#747487", fontSize: 23, fontWeight: "600" }}>
            Зарегистрируйтесь
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputs: {
    width: 356,
  },
  username: {
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
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
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
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
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
    text: { color: "black" },
  },
  btnActive: {
    backgroundColor: "#747487",
    width: 323,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
    borderRadius: 5,
    text: { color: "white" },
  },
});
