import * as SQLite from "expo-sqlite";

export function createDb() {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase("calories-cv.db");
  
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='logged_food';",
          [],
          (_, result) => {
            if (result.rows.length === 0) {
              // Table does not exist, create it
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
                  resolve(db); // Resolve the promise with the db instance
                },
                (_, error) => {
                  console.log("Failed to create table", error);
                  reject(error); // Reject the promise if there's an error
                }
              );
            } else {
              console.log("Table already exists");
              resolve(db); // Resolve the promise as the table already exists
            }
          },
          (_, error) => {
            console.log("Failed to check if table exists", error);
            reject(error); // Reject the promise if there's an error
          }
        );
      });
    });
  }
  

export async function insertDb(foodData) {
    const db = SQLite.openDatabase("calories-cv.db");
    const { foodName, foodDate, calories, protein, fats, carbs, imageUri } =
        foodData;
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

export async function updateFoodLog(logId, foodData) {
    const db = SQLite.openDatabase("calories-cv.db");

    // Destructure the data for easier access
    const { foodName, calories, protein, carbs, fats, foodDate, imageUri } =
        foodData;
    try {
        const result = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE logged_food 
                     SET food_name = ?, 
                         calories = ?, 
                         protein = ?, 
                         carbs = ?, 
                         fats = ?, 
                         food_date = ?, 
                         image_uri = ?
                     WHERE log_id = ?;`,
                    [
                        foodName,
                        calories,
                        protein,
                        carbs,
                        fats,
                        foodDate,
                        imageUri,
                        logId,
                    ],
                    (_, result) => resolve(result),
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
        return result;
    } catch (error) {
        console.error("Failed to update record:", error);
        throw error;
    }
}

export async function deleteFoodLog(logId) {
    const db = SQLite.openDatabase("calories-cv.db");

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM logged_food WHERE log_id = ?;",
                [logId],
                (_, result) => {
                    console.log(`Deleted log with id ${logId}`);
                    resolve(result);
                },
                (_, error) => {
                    console.error(
                        `Failed to delete log with id ${logId}:`,
                        error
                    );
                    reject(error);
                    return false;
                }
            );
        });
    });
}
