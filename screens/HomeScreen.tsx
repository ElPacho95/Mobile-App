import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import { useAppDispatch, useAppSelector } from "../store/store";
import { getData } from "../store/reducer/logInSlice";

import Footer from "../components/Footer";
import Button from "../components/Button";
import Modal from "../components/Modal";

import Arrow from "../svgs/Arrow";
import Menu from "../svgs/Menu";

import { SettingsState } from "../types/types";

export default function HomeScreen() {
  const { data } = useAppSelector((state) => state.logInSlice);

  const [settings, setSettings] = useState<SettingsState>({
    minAge: "20",
    maxAge: "22",
    gender: "MALE",
    from: new Date(),
    to: new Date(),
    modal: null,
  });

  const dispatch = useAppDispatch();

  const handleGetData = () => {
    const post = {
      gender: settings.gender,
      from: settings.from,
      to: settings.to,
      minAge: +settings.minAge,
      maxAge: +settings.maxAge,
    };
    dispatch(getData(post));
  };

  useEffect(() => {
    handleGetData();
  }, [
    settings.gender,
    settings.from,
    settings.to,
    settings.minAge,
    settings.maxAge,
  ]);

  return (
    <>
      <SafeAreaView>
        <View style={{ padding: 13 }}>
          <View style={styles.displayFlex}>
            <Arrow />
            <Text style={{ fontSize: 16 }}>Статистика аккаунта</Text>
            <Menu />
          </View>
          <View>
            <View style={styles.displayFlex}>
              <Button
                title="Последние 30 дней"
                active={settings.modal === "date"}
                onPress={() => setSettings({ ...settings, modal: "date" })}
              />
              <Text style={styles.text}>
                {settings.from.getDate()}{" "}
                {settings.from
                  .toLocaleString("default", { month: "long" })
                  .slice(0, 3)}{" "}
                - {settings.to.getDate()}{" "}
                {settings.to.toLocaleString("default", { month: "long" })}
              </Text>
            </View>
            <View style={[styles.displayFlex, { width: 325 }]}>
              <Button
                title="Возраст аудитории"
                active={settings.modal === "age"}
                onPress={() => setSettings({ ...settings, modal: "age" })}
              />
              <Text
                style={styles.text}
              >{`${settings.minAge}-${settings.maxAge}`}</Text>
            </View>
            <View style={[styles.displayFlex, { width: 340 }]}>
              <Button
                title="Пол. аудитории"
                active={settings.modal === "gender"}
                onPress={() => setSettings({ ...settings, modal: "gender" })}
              />
              <Text style={styles.text}>
                {settings.gender === "MALE"
                  ? "Мужчины"
                  : settings.gender === "FEMALE"
                  ? "Женщины"
                  : null}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.bondText}>Общие показатели</Text>
            <View style={[styles.displayFlex, { width: 295 }]}>
              <View>
                <Text style={styles.marginTop}>Подписалось</Text>
                <Text style={styles.marginTop}>Просмотров</Text>
                <Text style={styles.marginTop}>Охват</Text>
              </View>
              <View>
                <Text style={styles.marginTop}>{data?.subscribers}</Text>
                <Text style={styles.marginTop}>{data?.view}</Text>
                <Text style={styles.marginTop}>{data?.coverage}</Text>
              </View>
            </View>
            <Text style={styles.bondText}>Активность аккаунта</Text>
            <View style={[styles.displayFlex, { width: 295 }]}>
              <View>
                <Text style={styles.marginTop}>Добавили в избранное</Text>
                <Text style={styles.marginTop}>Поделились</Text>
                <Text style={styles.marginTop}>Уникальных чатов</Text>
              </View>
              <View>
                <Text style={styles.marginTop}>{data?.favourites}</Text>
                <Text style={styles.marginTop}>{data?.postsForwarding}</Text>
                <Text style={styles.marginTop}>{data?.uniqueChats}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.bondText}>География</Text>
              <View>
                <Text style={styles.marginTop}>
                  {Object.keys(data.geography || {}).length === 0 ? (
                    <Text>Список пуст</Text>
                  ) : (
                    Object.keys(data.geography).map((item) => (
                      <View
                        style={[styles.displayFlex, { width: 295 }]}
                        key={item}
                      >
                        <Text>{item}</Text>
                        <Text>{data.geography[item]}</Text>
                      </View>
                    ))
                  )}
                </Text>
              </View>
              <Text style={styles.bondText}>Заказы</Text>
              <View style={[styles.displayFlex, { width: 295 }]}>
                <View>
                  <Text style={styles.marginTop}>Заказы товаров :</Text>
                  <Text style={styles.marginTop}>Заказы услуг :</Text>
                </View>
                <View>
                  <Text style={styles.marginTop}>{data?.orders}</Text>
                  <Text style={styles.marginTop}>{data?.orders}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Modal state={settings} setState={setSettings} />
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  displayFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    paddingTop: 16,
    fontFamily: "bold",
  },
  bondText: { fontSize: 16, fontWeight: "600", marginTop: 21 },
  marginTop: { marginTop: 15 },
});
