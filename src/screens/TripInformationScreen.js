import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { useTrip } from "../hooks/useTrip";
import { useEffect, useState } from "react";
import { styles } from "./NewTripScreen";
import { useUser } from "../hooks/useUser";
import {
  addCollaborator,
  deleteCollaborator,
  getCollaborators,
} from "../utilities/trips/tripsService";

export default function TripInformationScreen() {
  const { tripData, setTripData } = useTrip();
  const { user } = useUser();
  const [editTrip, setEditTrip] = useState(tripData);
  const [collaborator, setCollaborator] = useState("");
  const [collabList, setCollabList] = useState([]);
  // console.log(user)

  useEffect(() => {
    (async () => {
      const data = await getCollaborators(tripData.id);
      // console.log(data);
      setCollabList(data);
    })();
  }, []);

  const handleCollaboratorChange = (text) => {
    setCollaborator(text);
  };

  const handleAddCollaborator = async () => {
    if (user.isPremium) {
      try {
        const addedCollaborator = await addCollaborator(
          collaborator,
          tripData.id
        );
        setCollaborator("");
        setCollabList([...collabList, addedCollaborator]);
      } catch (error) {
        Alert.alert(
          "Something went wrong",
          "Please check if the email entered is correct"
        );
      }
    } else {
      Alert.alert(
        "Premium feature",
        "This feature is only available for Premium Users. Buy today for $399/day"
      );
    }
  };

  const handleDeleteCollaborator = async (email) => {
    if (user.isPremium) {
      Alert.alert(
        "Remove Collaborator",
        "Are you sure you want to remove this collaborator?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                const deletedCollaborator = await deleteCollaborator(
                  email,
                  tripData.id
                );
                setCollabList(
                  collabList.filter(
                    (user) => user.email !== deletedCollaborator.email
                  )
                );
              } catch (error) {
                Alert.alert(
                  "Something went wrong",
                  "Please check if the email entered is correct"
                );
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Premium feature",
        "This feature is only available for Premium Users. Buy today for $399/day"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateInput}>
        <Text>Destination</Text>
        <TextInput
          editable={false}
          style={styles.input}
          // onChangeText={handleNameChange}
          value={editTrip?.name}
          autoComplete="country"
        />
      </View>
      <View style={styles.dateContainer}>
        <View style={styles.dateInput}>
          <Text>Start</Text>
          <Button
            title={new Date(editTrip.startdate).toDateString()}
            disabled
            // onPress={showStartDatePickerModal}
          />
        </View>
        <View style={styles.dateInput}>
          <Text>End</Text>
          <Button
            title={new Date(editTrip.enddate).toDateString()}
            disabled
            // onPress={showEndDatePickerModal}
          />
        </View>
      </View>
      <View style={styles.dateInput}>
        <Text>Shared With</Text>
        <ScrollView vertical style={localStyles.scrollView}>
          {collabList.map((userObj) => (
            <View style={localStyles.userList}>
              <Text>
                {userObj.email === user.email
                  ? userObj.email + "   (you)"
                  : userObj.email}
              </Text>
              {userObj.email !== user.email && (
                <Pressable
                  style={localStyles.deletePressable}
                  onPress={() => handleDeleteCollaborator(userObj.email)}
                >
                  <Text style={localStyles.deletePressable}>Delete</Text>
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={handleCollaboratorChange}
          editable={user.isPremium}
          placeholder={
            user.isPremium ? "example@example.com" : "Premium feature"
          }
          value={collaborator}
          autoComplete="email"
        />
        <Button
          title="Add Collaborator"
          onPress={handleAddCollaborator}
          disabled={!user.isPremium}
        />
      </View>
      <Button title="Save Trip" disabled />
    </View>
  );
}

const localStyles = StyleSheet.create({
  scrollView: {
    maxHeight: "50%",
    minHeight: "20%",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  userList: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 25,
    alignItems: "center",
  },
  deletePressable: {
    backgroundColor: "red",
    color: "white",
  },
});
