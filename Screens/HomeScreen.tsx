import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import ModalComponent from "../Components/ModalComponent";
import Footer from "../Components/Footer";
import Btn from "../Components/Btn";

import Arrow from "../svgs/Arrow";
import Menu from "../svgs/Menu";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useAppDispatch, useAppSelector } from "../store/store";
import { getData } from "../store/reducer/adminSlice";

export default function HomeScreen({ navigation }: any) {
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
      <SafeAreaView
        style={{ width: 367, marginLeft: "auto", marginRight: "auto" }}
      >
        <View style={styles.header}>
          <Arrow />
          <Text style={{ fontSize: 16 }}>Статистика аккаунта</Text>
          <Menu />
        </View>
        <View>
          <View style={styles.select}>
            <Btn
              title="Последние 30 дней"
              active={dateModal}
              setActive={setDateModal}
            />
            <Text style={styles.select.text}>
              {from.getDate()}{" "}
              {from.toLocaleString("default", { month: "long" })} -{" "}
              {to.getDate()} {to.toLocaleString("default", { month: "long" })}
            </Text>
          </View>
          <View style={styles.select}>
            <Btn
              title="Возраст аудитории"
              active={ageModal}
              setActive={setAgeModal}
            />
            <Text style={styles.select.text}>
              {minAge}-{maxAge}
            </Text>
          </View>
          <View style={styles.select}>
            <Btn
              title="Пол. аудитории"
              active={genderModal}
              setActive={setGenderModal}
            />
            <Text style={styles.select.text}>
              {gender === "MALE"
                ? "Мужчины"
                : gender === "FEMALE"
                ? "Женщины"
                : "-"}
            </Text>
          </View>
        </View>
        <View style={{ width: 320 }}>
          <Text style={styles.bondText}>Общие показатели</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ marginTop: 15 }}>Подписалось</Text>
              <Text style={{ marginTop: 15 }}>Просмотров</Text>
              <Text style={{ marginTop: 15 }}>Охват</Text>
            </View>
            <View>
              <Text style={{ marginTop: 15 }}>{data.subscribers}</Text>
              <Text style={{ marginTop: 15 }}>{data.view}</Text>
              <Text style={{ marginTop: 15 }}>{data.coverage}</Text>
            </View>
          </View>
          <Text style={styles.bondText}>Активность аккаунта</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ marginTop: 15 }}>Добавили в избранное</Text>
              <Text style={{ marginTop: 15 }}>Поделились</Text>
              <Text style={{ marginTop: 15 }}>Уникальных чатов</Text>
            </View>
            <View>
              <Text style={{ marginTop: 15 }}>{data.favourites}</Text>
              <Text style={{ marginTop: 15 }}>{data.postsForwarding}</Text>
              <Text style={{ marginTop: 15 }}>{data.uniqueChats}</Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 21 }}>
              География
            </Text>
            {data.geography?.length === 0 ? (
              <Text style={{ marginTop: 15 }}>Список пуст</Text>
            ) : (
              data?.geography?.map((item) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ marginTop: 15 }}>{item.city}</Text>
                    <Text style={{ marginTop: 15 }}>{item.count}</Text>
                  </View>
                );
              })
            )}
            <Text style={styles.bondText}>Заказы</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ marginTop: 15 }}>Заказы товаров :</Text>
                <Text style={{ marginTop: 15 }}>Заказы услуг :</Text>
              </View>
              <View>
                <Text style={{ marginTop: 15 }}>{data.orders}</Text>
                <Text style={{ marginTop: 15 }}>{data.orders}</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <ModalComponent
        title="Выбор параметров периода"
        modalVisible={dateModal}
        setModalVisible={setDateModal}
        save={handleGetData}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 330,
            marginTop: 19,
          }}
        >
          <DateTimePicker value={from} mode="date" onChange={onChange} />

          <DateTimePicker
            value={to}
            mode="date"
            onChange={onChange2}
            display={"default"}
          />
        </View>
      </ModalComponent>
      <ModalComponent
        title="Выбор параметров возраста"
        modalVisible={ageModal}
        setModalVisible={setAgeModal}
        save={handleGetData}
      >
        <View style={styles.modalParams}>
          <TextInput
            onChangeText={setMinAge}
            value={minAge}
            keyboardType="numeric"
            style={styles.num}
          />
          <Text style={{ marginTop: 16 }}>-</Text>
          <TextInput
            onChangeText={setMaxAge}
            value={maxAge}
            keyboardType="numeric"
            style={styles.num}
          />
        </View>
      </ModalComponent>
      <ModalComponent
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
            <Text style={{ textAlign: "center" }}>Мужчины</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("FEMALE")}
            style={gender === "FEMALE" ? styles.genderBTNActive : styles.gender}
          >
            <Text style={{ textAlign: "center" }}>Женщины</Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>
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

    text: {
      paddingTop: 16,
    },
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
    width: 320,
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
});
