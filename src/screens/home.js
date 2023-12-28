import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const API_URL = "https://api.nobelprize.org/v1/prize.json";

const Home = () => {
  const [prizes, setPrizes] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  // Function to find Nobel laureates who have won more than once
  const findMultipleTimeWinners = () => {
    const laureatesMap = new Map();

    if (!prizes || prizes.length === 0) {
      return [];
    }

    prizes.forEach((prize) => {
      if (prize && prize.laureates && prize.laureates.length > 0) {
        prize.laureates.forEach((laureate) => {
          const fullName = `${laureate.firstname} ${laureate.surname}`;
          const year = prize.year;
          const motivation = laureate.motivation || "";
          const laureateInfo = { name: `${fullName} (${year})`, count: 1 };

          // Check if the laureate is an individual (not an organization)
          if (
            !motivation.toLowerCase().includes("organization") &&
            laureate.firstname &&
            laureate.surname
          ) {
            if (!laureatesMap.has(fullName)) {
              laureatesMap.set(fullName, laureateInfo);
            } else {
              const existingInfo = laureatesMap.get(fullName);
              laureatesMap.set(fullName, {
                ...existingInfo,
                count: existingInfo.count + 1,
              });
            }
          }
        });
      }
    });

    const multipleTimeWinners = [];
    laureatesMap.forEach((info) => {
      if (info.count > 1) {
        multipleTimeWinners.push(info);
      }
    });

    return multipleTimeWinners;
  };

  const multipleTimeWinners = findMultipleTimeWinners();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const { prizes: fetchedPrizes } = await response.json();

      setPrizes(fetchedPrizes || []);
      setFilteredPrizes(fetchedPrizes || []);

      const uniqueFields = Array.from(
        new Set(fetchedPrizes.map((prize) => prize.category))
      );
      setFields(uniqueFields);

      const uniqueYears = Array.from(
        new Set(fetchedPrizes.map((prize) => prize.year))
      ).filter((year) => year >= 1900 && year <= 2018);
      setYears(uniqueYears);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    filterPrizes();
  }, [selectedField, selectedYear]);

  const filterPrizes = () => {
    let filteredData = prizes;

    if (selectedField !== "") {
      filteredData = filteredData.filter(
        (prize) => prize.category === selectedField
      );
    }

    if (selectedYear !== "") {
      filteredData = filteredData.filter(
        (prize) => prize.year.toString() === selectedYear
      );
    }

    setFilteredPrizes(filteredData);
  };

  const renderPrizeItem = ({ item }) => {
    if (!item) {
      return null;
    }

    return (
      <View style={styles.prizeItem}>
        <Text style={styles.title}>
          {item.category
            ? `Category: ${item.category}`
            : "Category: Not specified"}
        </Text>
        <FlatList
          data={item.laureates}
          keyExtractor={(laureate) => `${item.year}_${laureate.id}`}
          renderItem={({ item: laureate }) => (
            <View style={styles.laureateItem}>
              <Text
                style={styles.name}
              >{`${laureate.firstname} ${laureate.surname} ${item.year}`}</Text>
              <Text style={styles.field}>
                {laureate.motivation || "Motivation not specified"}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Display multiple time Nobel Prize winners */}
      <View style={styles.multipleWinnersContainer}>
        <Text style={styles.multipleWinnersTitle}>
          Multiple Time Nobel Prize Winners
        </Text>
        <FlatList
          data={multipleTimeWinners}
          keyExtractor={(item, index) => `${index}_${item.name}`}
          renderItem={({ item, index }) => (
            <View style={styles.multipleWinnerItem}>
              <Text>{`${index + 1}. ${item.name}: ${item.count} times`}</Text>
            </View>
          )}
        />
      </View>

      {/* Pickers for filtering */}
      <Picker
        selectedValue={selectedField}
        onValueChange={(itemValue) => setSelectedField(itemValue)}
      >
        <Picker.Item label="All Categories" value="" />
        {fields.map((field, index) => (
          <Picker.Item key={index} label={field} value={field} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
      >
        <Picker.Item label="All Years" value="" style={styles.Picker} />
        {years.map((year, index) => (
          <Picker.Item
            key={index}
            label={year.toString()}
            value={year.toString()}
          />
        ))}
      </Picker>

      {/* Display filtered prizes */}
      <FlatList
        data={filteredPrizes}
        keyExtractor={(item, index) => `${item.year}_${index}`}
        renderItem={renderPrizeItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  prizeItem: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f47373",
    paddingVertical: 15,
    backgroundColor: "#00d084",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  laureateItem: {
    marginVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  field: {
    fontSize: 14,
    color: "white",
  },
  // New styles for multiple time winners section
  multipleWinnersContainer: {
    borderWidth: 1,
    borderColor: "#7B1FA2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#8ED1FC",
  },
  multipleWinnersTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 5,
  },
  multipleWinnerItem: {
    marginBottom: 5,
  },
  Picker: {
    margin: 10,
    borderBlockColor: "red",
  },
});

export default Home;
