import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Button from "../components/Button";

import Arrow from "../svgs/Arrow";
import Menu from "../svgs/Menu";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useAppDispatch, useAppSelector } from "../store/store";
import { getData } from "../store/reducer/adminSlice";

export default function HomeScreen() {
  const { data } = useAppSelector((state) => state.adminSlice);

  const [genderModal, setGenderModal] = useState<boolean>(false);
  const [dateModal, setDateModal] = useState<boolean>(false);
  const [ageModal, setAgeModal] = useState<boolean>(false);

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const onChange = (event: any, selectedDate: Date | undefined): void => {
    if (selectedDate) {
      setFrom(selectedDate);
    }
  };

  const onChange2 = (event: any, selectedDate: Date | undefined): void => {
    if (selectedDate) {
      setTo(selectedDate);
    }
  };

  const [minAge, setMinAge] = useState<any>("");
  const [maxAge, setMaxAge] = useState<any>("");

  const handleMinAgeChange = (text: string) => {
    const regex = /^\d{0,2}$/;
    if (regex.test(text)) {
      setMinAge(text);
    }
  };

  const handleMaxAgeChange = (text: string) => {
    const regex = /^\d{0,2}$/;
    if (regex.test(text)) {
      setMaxAge(text);
    }
  };

  const today = new Date();

  const minAgeDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );

  const maxAgeDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );

  const minAgeISO = minAgeDate.toISOString();
  const maxAgeISO = maxAgeDate.toISOString();

  const [gender, setGender] = useState("");

  const dispatch = useAppDispatch();

  const handleGetData = () => {
    const post = {
      gender: gender,
      from: from,
      to: to,
      minAge: minAgeISO,
      maxAge: maxAgeISO,
    };
    if (gender !== "" && minAge !== "" && maxAge !== "") {
      dispatch(getData(post));
    }
  };

  return (
    <>
      <SafeAreaView>
        <View style={{ padding: 13 }}>
          <View style={styles.header}>
            <Arrow />
            <Text style={{ fontSize: 16 }}>Статистика аккаунта</Text>
            <Menu />
          </View>
          <View>
            <View style={styles.selectDate}>
              <Button
                title="Последние 30 дней"
                active={dateModal}
                setActive={setDateModal}
              />
              <Text style={styles.select.text}>
                {from.getDate()}{" "}
                {from.toLocaleString("default", { month: "long" }).slice(0, 3)}{" "}
                - {to.getDate()}{" "}
                {to.toLocaleString("default", { month: "long" })}
              </Text>
            </View>
            <View style={styles.select}>
              <Button
                title="Возраст аудитории"
                active={ageModal}
                setActive={setAgeModal}
              />
              <Text style={styles.select.text}>
                {minAge && maxAge && `${minAge}-${maxAge}`}
              </Text>
            </View>
            <View style={styles.selectGender}>
              <Button
                title="Пол. аудитории"
                active={genderModal}
                setActive={setGenderModal}
              />
              <Text style={styles.select.text}>
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
            <View style={styles.displayFlex}>
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
            <View style={styles.displayFlex}>
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
                    <View style={styles.displayFlex}>
                      <Text style={styles.marginTop}>{item.city}</Text>
                      <Text style={styles.marginTop}>{item.count}</Text>
                    </View>
                  );
                })
              )}
              <Text style={styles.bondText}>Заказы</Text>
              <View style={styles.displayFlex}>
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
        title="Выбор параметров периода"
        modalVisible={dateModal}
        setModalVisible={setDateModal}
        save={handleGetData}
      >
        <View style={styles.dateFlex}>
          <DateTimePicker
            value={from}
            onChange={onChange}
            testID="dateTimePicker"
            mode="date"
            display="default"
          />
          <Text>{"   :"}</Text>
          <DateTimePicker
            value={to}
            onChange={onChange2}
            testID="dateTimePicker"
            mode="date"
            display="default"
          />
        </View>
      </Modal>
      <Modal
        title="Выбор параметров возраста"
        modalVisible={ageModal}
        setModalVisible={setAgeModal}
        save={handleGetData}
      >
        <View style={styles.modalParams}>
          <TextInput
            onChangeText={handleMinAgeChange}
            value={minAge}
            keyboardType="numeric"
            style={styles.num}
          />
          <Text style={styles.marginTop}>-</Text>
          <TextInput
            onChangeText={handleMaxAgeChange}
            value={maxAge}
            keyboardType="numeric"
            style={styles.num}
          />
        </View>
      </Modal>
      <Modal
        title="Выбор параметров пола аудитории"
        modalVisible={genderModal}
        setModalVisible={setGenderModal}
        save={handleGetData}
      >
        <View style={styles.modalParams}>
          <TouchableOpacity
            onPress={() => setGender("MALE")}
            style={gender === "MALE" ? styles.genderBTNActive : styles.gender}
          >
            <Text
              style={gender === "MALE" ? styles.textWhite : styles.textBlack}
            >
              Мужчины
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("FEMALE")}
            style={gender === "FEMALE" ? styles.genderBTNActive : styles.gender}
          >
            <Text
              style={gender === "FEMALE" ? styles.textWhite : styles.textBlack}
            >
              Женщины
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    width: 315,
    text: {
      paddingTop: 16,
      fontFamily: "bold",
    },
  },
  selectDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    width: 355,
  },
  selectGender: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    width: 328,
  },
  num: {
    width: 134,
    height: 48,
    backgroundColor: "#D8D8DD",
    borderRadius: 5,
    marginTop: 16,
    textAlign: "center",
  },
  modalParams: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    width: 290,
  },
  gender: {
    width: 134,
    height: 48,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#D8D8DD",
    marginTop: 16,
  },
  genderBTNActive: {
    backgroundColor: "#747487",
    width: 134,
    height: 48,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 16,
  },
  bondText: { fontSize: 16, fontWeight: "600", marginTop: 21 },
  displayFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 290,
  },
  dateFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 23,
  },
  textWhite: { color: "white", textAlign: "center" },
  textBlack: { color: "black", textAlign: "center" },
  marginTop: { marginTop: 15 },
});
