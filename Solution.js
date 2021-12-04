
/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
var earliestAcq = function (logs, n) {
    const groupsOfFreinds = new GroupsOfFreinds(logs, n);
    return groupsOfFreinds.findCommonGroupsOfFriends(logs);
};

class GroupsOfFreinds {

    /**
     * @param {number[][]} logs
     * @param {number} n
     */
    constructor(logs, n) {
        this.totalPeople = n;
        this.totalGroups = n;
        this.totalLogs = logs.length;
        this.rank = new Array(this.totalPeople).fill(0);
        this.parent = [];
        this.initialize_arrayParent();
        // sort matrix by the column for 'time stamps' in increasing order.
        logs.sort((a, b) => (a[0] - b[0]));
    }

    /**
     * @param {number[][]} logs
     */
    findCommonGroupsOfFriends(logs) {
        for (let i = 0; i < this.totalLogs; i++) {
            this.unionFind(logs[i][1], logs[i][2]);
            if (this.totalGroups === 1) {
                return logs[i][0];
            }
        }
        return -1;
    }

    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     */
    unionFind(indexOne, indexTwo) {
        indexOne = this.findParent(indexOne);
        indexTwo = this.findParent(indexTwo);

        if (indexOne !== indexTwo) {
            this.joinByRank(indexOne, indexTwo);
            this.totalGroups--;
        }
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     */
    joinByRank(indexOne, indexTwo) {
        if (this.rank[indexOne] > this.rank[indexTwo]) {
            this.parent[indexTwo] = indexOne;
        } else if (this.rank[indexOne] < this.rank[indexTwo]) {
            this.parent[indexOne] = indexTwo;
        } else {
            this.parent[indexTwo] = indexOne;
            this.rank[indexOne]++;
        }
    }

    initialize_arrayParent() {
        for (let i = 0; i < this.totalPeople; i++) {
            this.parent[i] = i;
        }
    }
}
