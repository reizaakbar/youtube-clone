import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { PROFILE } from "../queries/queries";
import { LoginContext } from "../contexts/LoginContext";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const historyData = [
  {
    id: "1",
    title: "Apa Itu CSS GRID ?",
    channel: "Web Programing Unpas",
    thumbnail:
      "https://i.pinimg.com/200x150/0f/02/23/0f022388e3e14f663c00203dd18000a2.jpg",
  },
  {
    id: "2",
    title: "Abba-Dancing Queen",
    channel: "Abba",
    thumbnail: "https://i.ytimg.com/vi/-sVB91NTa4A/maxresdefault.jpg",
  },
  {
    id: "3",
    title: "DI KAGETIN FORTUNER",
    channel: "Top Global Miya",
    thumbnail:
      "https://gamefinity-assets.sgp1.digitaloceanspaces.com/wp-content/uploads/2023/08/28125630/FB-Pascol-Kintil-Top-Global-Miya-e1693202801361.jpg",
  },
  {
    id: "4",
    title: "Sepecial 1 Million",
    channel: "Garasi Drift",
    thumbnail: "https://i.ytimg.com/vi/1ueqqq-SdIg/maxresdefault.jpg",
  },
  {
    id: "5",
    title: "Rekomendasi HP 2024",
    channel: "Gadgetin",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSGc_lxE1dWxJi8-2Fz4WuP_kEQvOm-NrIR_Sv69pTduVZ1OsgyUkmjyCRHYTzDmsJ3UAnaXuyr0KzpSeAC1HbCRUgy3x0_7jALK8JZOdBvKWh1X7f8E4J4xle6mc5DrGIrZIbd7qcZn4/w1200-h630-p-k-no-nu/davidgadgetin.jpg",
  },
  // Add more history items here
];

const playlistData = [
  {
    id: "1",
    title: "Tonton nanti",
    count: 13,
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:389/1*oBPVB4KfQFsLE_ec0sLhQg.png",
  },
  {
    id: "2",
    title: "Video yang disukai",
    count: 16,
    thumbnail:
      "https://sequentialplanet.com/wp-content/uploads/2023/08/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_-1.jpg",
  },
  {
    id: "3",
    title: "Tonton nanti",
    count: 10,
    thumbnail: "https://i.ytimg.com/vi/xNV38nq1fqc/maxresdefault.jpg",
  },
];

export default function ProfileScreen() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { data, error, loading } = useQuery(PROFILE);

  const profileData = data?.userProfile;

  async function handleLogout() {
    try {
      await SecureStore.deleteItemAsync("token");
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=3",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileData?.name}</Text>
        <Text style={styles.username}>@{profileData?.username}</Text>

        <View style={styles.followContainer}>
          <View style={styles.followSection}>
            <Text style={styles.followCount}>
              {profileData?.followings?.length || 0}
            </Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
          <View style={styles.followSection}>
            <Text style={styles.followCount}>
              {profileData?.followers?.length || 0}
            </Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histori</Text>
        <FlatList
          data={historyData}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.historyThumbnail}
              />
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyChannel}>{item.channel}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Playlist Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Playlist</Text>
        <FlatList
          data={playlistData}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.playlistItem}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.playlistThumbnail}
              />
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistCount}>{item.count} videos</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  username: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  followSection: {
    alignItems: "center",
  },
  followCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  followLabel: {
    fontSize: 14,
    color: "#000",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  historyItem: {
    marginRight: 15,
  },
  historyThumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  historyChannel: {
    fontSize: 12,
    color: "#000",
  },
  playlistItem: {
    marginRight: 15,
    alignItems: "center",
  },
  playlistThumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  playlistCount: {
    fontSize: 12,
    color: "#aaa",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
