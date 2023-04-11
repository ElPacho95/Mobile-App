import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import { useAppDispatch, useAppSelector } from "../store/store";
import { getData } from "../store/reducer/logInSlice";

import Footer from "../components/Footer";
import Button from "../components/Button";
import Modal from "../components/Modal";

import Arrow from "../svgs/Arrow";
import Menu from "../svgs/Menu";

export default function HomeScreen() {
  const { data } = useAppSelector((state) => state.logInSlice);

  const [openedType, setOpenedType] = useState<
    null | "age" | "gender" | "date"
  >(null);

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const [minAge, setMinAge] = useState("20");
  const [maxAge, setMaxAge] = useState("22");

  const today = new Date();

  const minAgeDate = new Date(
    today.getFullYear() - parseInt(minAge),
    today.getMonth(),
    today.getDate()
  );

  const maxAgeDate = new Date(
    today.getFullYear() - parseInt(maxAge),
    today.getMonth(),
    today.getDate()
  );

  const [gender, setGender] = useState("MALE");

  const dispatch = useAppDispatch();
  const handleGetData = () => {
    const post = {
      gender: gender,
      from: from,
      to: to,
      minAge: minAgeDate,
      maxAge: maxAgeDate,
    };
    dispatch(getData(post));
  };

  useEffect(() => {
    handleGetData();
  }, [dispatch]);

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
                active={openedType === "date"}
                onPress={() => setOpenedType("date")}
              />
              <Text style={styles.text}>
                {from.getDate()}{" "}
                {from.toLocaleString("default", { month: "long" }).slice(0, 3)}{" "}
                - {to.getDate()}{" "}
                {to.toLocaleString("default", { month: "long" })}
              </Text>
            </View>
            <View style={[styles.displayFlex, { width: 325 }]}>
              <Button
                title="Возраст аудитории"
                active={openedType === "age"}
                onPress={() => setOpenedType("age")}
              />
              <Text style={styles.text}>{`${minAge}-${maxAge}`}</Text>
            </View>
            <View style={[styles.displayFlex, { width: 340 }]}>
              <Button
                title="Пол. аудитории"
                active={openedType === "gender"}
                onPress={() => setOpenedType("gender")}
              />
              <Text style={styles.text}>
                {gender === "MALE"
                  ? "Мужчины"
                  : gender === "FEMALE"
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
              {data?.geography?.length === 0 ? (
                <Text style={styles.marginTop}>Список пуст</Text>
              ) : (
                data?.geography?.map((item) => {
                  return (
                    <View style={[styles.displayFlex, { width: 295 }]}>
                      <Text style={styles.marginTop}>{item.city}</Text>
                      <Text style={styles.marginTop}>{item.count}</Text>
                    </View>
                  );
                })
              )}
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
      <Modal
        openedType={openedType}
        setOpenedType={setOpenedType}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        minAge={minAge}
        maxAge={maxAge}
        setMinAge={setMinAge}
        setMaxAge={setMaxAge}
        gender={gender}
        setGender={setGender}
        save={handleGetData}
      />
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
