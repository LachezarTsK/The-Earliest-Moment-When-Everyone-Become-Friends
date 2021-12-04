
import java.util.Arrays;

public class Solution {

    int[] parent;
    int[] rank;
    int totalPeople;
    int totalGroups;
    int totalLogs;

    public int earliestAcq(int[][] logs, int n) {
        totalPeople = n;
        totalGroups = n;
        totalLogs = logs.length;
        rank = new int[totalPeople];
        initialize_arrayParent();
        // sort matrix by the column for 'time stamps' in increasing order.
        Arrays.sort(logs, (a, b) -> (a[0] - b[0]));
        return findCommonGroupsOfFriends(logs);
    }

    public int findCommonGroupsOfFriends(int[][] logs) {
        for (int i = 0; i < totalLogs; i++) {
            unionFind(logs[i][1], logs[i][2]);
            if (totalGroups == 1) {
                return logs[i][0];
            }
        }
        return -1;
    }

    public void unionFind(int indexOne, int indexTwo) {
        indexOne = findParent(indexOne);
        indexTwo = findParent(indexTwo);

        if (indexOne != indexTwo) {
            joinByRank(indexOne, indexTwo);
            totalGroups--;
        }
    }

    public int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    public void joinByRank(int indexOne, int indexTwo) {
        if (rank[indexOne] > rank[indexTwo]) {
            parent[indexTwo] = indexOne;
        } else if (rank[indexOne] < rank[indexTwo]) {
            parent[indexOne] = indexTwo;
        } else {
            parent[indexTwo] = indexOne;
            rank[indexOne]++;
        }
    }

    public void initialize_arrayParent() {
        parent = new int[totalPeople];
        for (int i = 0; i < totalPeople; i++) {
            parent[i] = i;
        }
    }
}
