
using namespace std;

class Solution {
public:

	int* parent;
	int* rank;
	int totalPeople;
	int totalGroups;
	int totalLogs;


	int earliestAcq(vector<vector<int>>& logs, int n) {
		totalPeople = n;
		totalGroups = n;
		totalLogs = logs.size();
		rank = new int[totalPeople];
		initialize_arrayParent();
		sort(logs.begin(), logs.end(), sortByColumn);
		return findCommonGroupsOfFriends(logs);
	}

	// sort matrix by the column for 'time stamps' in increasing order.
	static bool sortByColumn(const vector<int>& vec_01, const vector<int>& vec_02) {
		return vec_01[0] < vec_02[0];
	}

	int findCommonGroupsOfFriends(const vector<vector<int>>& logs) {
		for (int i = 0; i < totalLogs; i++) {
			unionFind(logs[i][1], logs[i][2]);
			if (totalGroups == 1) {
				return logs[i][0];
			}
		}
		return -1;
	}

	void unionFind(int indexOne, int indexTwo) {
		indexOne = findParent(indexOne);
		indexTwo = findParent(indexTwo);

		if (indexOne != indexTwo) {
			joinByRank(indexOne, indexTwo);
			totalGroups--;
		}
	}

	int findParent(int index) {
		if (parent[index] != index) {
			parent[index] = findParent(parent[index]);
		}
		return parent[index];
	}

	void joinByRank(int indexOne, int indexTwo) {
		if (rank[indexOne] > rank[indexTwo]) {
			parent[indexTwo] = indexOne;
		}
		else if (rank[indexOne] < rank[indexTwo]) {
			parent[indexOne] = indexTwo;
		}
		else {
			parent[indexTwo] = indexOne;
			rank[indexOne]++;
		}
	}

	void initialize_arrayParent() {
		parent = new int[totalPeople];
		for (int i = 0; i < totalPeople; i++) {
			parent[i] = i;
		}
	}
};
