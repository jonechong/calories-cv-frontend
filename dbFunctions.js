import * as SQLite from "expo-sqlite";

export async function insertDb({
    foodName,
    foodDate,
    calories,
    protein,
    fats,
    carbs,
    imageUri,
}) {
    const db = SQLite.openDatabase("calories-cv.db");
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO logged_food (food_name, food_date, calories, protein, fats, carbs, image_uri)
              VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [foodName, foodDate, calories, protein, fats, carbs, imageUri],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
}

export async function fetchDb(queryDate) {
    const db = SQLite.openDatabase("calories-cv.db");
    const dateString = queryDate.toISOString().split("T")[0];
    try {
        const result = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM logged_food WHERE food_date = date(?);",
                    [dateString],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
        return result;
    } catch (error) {
        console.error("Failed to fetch records:", error);
        throw error;
    }
}

export async function createDb() {
    const db = SQLite.openDatabase("calories-cv.db");

    db.transaction((tx) => {
        tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='logged_food';",
            [],
            (_, result) => {
                if (result.rows.length > 0) {
                    console.log("Table already exists");
                } else {
                    // Table does not exist, so create it
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS logged_food (
                            log_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                            food_name TEXT NOT NULL,
                            food_date DATE NOT NULL,
                            calories INTEGER NOT NULL,
                            protein INTEGER,
                            fats INTEGER,
                            carbs INTEGER,
                            image_uri TEXT
                        );`,
                        [],
                        () => {
                            console.log("Table created successfully");
                        },
                        (_, error) => {
                            console.log("Failed to create table", error);
                        }
                    );
                }
            },
            (_, error) => {
                console.log("Failed to check if table exists", error);
            }
        );
    });
}
