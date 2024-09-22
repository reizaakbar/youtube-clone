import { Button, Image, Text, View } from "react-native";
import styles from "../utils/styles";
import { Chip, Divider } from "react-native-paper";

export default function PostCard({ postData, navFn }) {
  return (
    <View style={styles.postContainer} onPress={navFn}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: postData.author.imgUrl }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={styles.postHeaderDetails}>
          <Text style={styles.postAuthorName}>{postData.author.name}</Text>
          <Text style={styles.postAuthorHandle}>@{postData.author.name}</Text>
        </View>
      </View>
      {postData.imgUrl ? (
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: postData.imgUrl }}
            style={{ width: "100%", height: 200, marginBottom: 10 }}
          />
        </View>
      ) : (
        <></>
      )}

      <View>
        <Text style={styles.postContent}>{postData.content}</Text>
      </View>
      {/* for likes and comments*/}
      <View style={styles.postStats}>
        <Text style={styles.postStat}>{postData.likes.length} Likes</Text>
        <Text style={styles.postStat}>{postData.comments.length} Comments</Text>
      </View>
      <View style={styles.postTags}>
        {postData.tags.map((e) => (
          <Chip key={e} style={styles.postTag}>
            {e}
          </Chip>
        ))}
      </View>

      <Divider style={styles.postDivider} />
      <Button
        title="See More"
        onPress={navFn}
        style={styles.postButton}
        color="red"
      />
    </View>
  );
}
