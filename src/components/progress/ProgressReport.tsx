import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

function formatDate(date: string) {
  const value = new Date(`${date}T00:00:00`);

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function number(value: unknown) {
  const result = Number(value);

  return Number.isFinite(result) ? result : 0;
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

/* ============================================================
   PDF STYLES
============================================================ */

const styles = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 40,
    paddingHorizontal: 36,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    color: "#191c1d",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#dfe5e3",
  },

  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#004e47",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 9,
    color: "#6e7977",
  },

  reportTitle: {
    marginTop: 22,
    fontSize: 22,
    fontWeight: "bold",
    color: "#191c1d",
  },

  reportPeriod: {
    marginTop: 5,
    fontSize: 10,
    color: "#6e7977",
  },

  section: {
    marginTop: 22,
  },

  sectionTitle: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#004e47",
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  summaryCard: {
    width: "23.5%",
    minHeight: 70,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f3f7f6",
    borderWidth: 1,
    borderColor: "#e1e8e6",
  },

  summaryLabel: {
    fontSize: 7,
    color: "#6e7977",
    textTransform: "uppercase",
  },

  summaryValue: {
    marginTop: 7,
    fontSize: 15,
    fontWeight: "bold",
    color: "#004e47",
  },

  summaryUnit: {
    fontSize: 8,
    color: "#6e7977",
  },

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dfe5e3",
    borderRadius: 6,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#004e47",
    color: "#ffffff",
    paddingVertical: 7,
    paddingHorizontal: 6,
  },

  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e6ebea",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },

  tableRowAlt: {
    backgroundColor: "#f8faf9",
  },

  cell: {
    fontSize: 7.5,
    color: "#303837",
  },

  cellHeader: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#ffffff",
  },

  empty: {
    padding: 15,
    textAlign: "center",
    fontSize: 9,
    color: "#6e7977",
  },

  note: {
    marginTop: 8,
    fontSize: 7.5,
    color: "#6e7977",
  },

  footer: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e1e5e4",
    paddingTop: 6,
  },

  footerText: {
    fontSize: 7,
    color: "#899391",
  },

  pageBreak: {
    marginTop: 5,
  },
});

/* ============================================================
   PDF COMPONENT
============================================================ */

interface ReportProps {
  from: string;
  to: string;

  profile: {
    currentWeight: number;
    targetWeight: number;
    calorieTarget: number;
    proteinTarget: number;
    carbsTarget: number;
    fatTarget: number;
    fiberTarget: number;
  };

  meals: any[];
  activities: any[];
  weightLogs: any[];
}

export default function ProgressReport({
  from,
  to,
  profile,
  meals,
  activities,
  weightLogs,
}: ReportProps) {
  /* ----------------------------------------------------------
     CALCULATE TOTALS
  ---------------------------------------------------------- */

  const totalCalories = meals.reduce(
    (sum, meal) =>
      sum + number(meal.calories),
    0
  );

  const totalProtein = meals.reduce(
    (sum, meal) =>
      sum + number(meal.protein_g),
    0
  );

  const totalCarbs = meals.reduce(
    (sum, meal) =>
      sum + number(meal.carbs_g),
    0
  );

  const totalFat = meals.reduce(
    (sum, meal) =>
      sum + number(meal.fat_g),
    0
  );

  const totalFiber = meals.reduce(
    (sum, meal) =>
      sum + number(meal.fiber_g),
    0
  );

  const totalExerciseCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        number(
          activity.calories_burned
        ),
      0
    );

  const totalExerciseMinutes =
    activities.reduce(
      (sum, activity) =>
        sum +
        number(
          activity.duration_minutes
        ),
      0
    );

  /* ----------------------------------------------------------
     UNIQUE LOGGED DAYS
  ---------------------------------------------------------- */

  const loggedDates =
    new Set<string>();

  for (const meal of meals) {
    if (meal.meal_date) {
      loggedDates.add(
        meal.meal_date
      );
    }
  }

  for (const activity of activities) {
    if (activity.activity_date) {
      loggedDates.add(
        activity.activity_date
      );
    }
  }

  /* ----------------------------------------------------------
     AVERAGES
  ---------------------------------------------------------- */

  const loggedDays =
    loggedDates.size;

  const averageCalories =
    loggedDays > 0
      ? totalCalories / loggedDays
      : 0;

  const averageProtein =
    loggedDays > 0
      ? totalProtein / loggedDays
      : 0;

  /* ----------------------------------------------------------
     WEIGHT CHANGE
  ---------------------------------------------------------- */

  const sortedWeights =
    [...weightLogs].sort(
      (a, b) =>
        String(
          a.recorded_at
        ).localeCompare(
          String(b.recorded_at)
        )
    );

  const firstWeight =
    sortedWeights.length > 0
      ? number(
          sortedWeights[0]
            .weight_kg
        )
      : profile.currentWeight;

  const lastWeight =
    sortedWeights.length > 0
      ? number(
          sortedWeights[
            sortedWeights.length - 1
          ].weight_kg
        )
      : profile.currentWeight;

  const weightChange =
    lastWeight - firstWeight;

  /* ----------------------------------------------------------
     DAILY DATA
  ---------------------------------------------------------- */

  const dailyMap =
    new Map<
      string,
      {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
        exerciseCalories: number;
      }
    >();

  for (const meal of meals) {
    const date =
      meal.meal_date;

    if (!date) continue;

    const current =
      dailyMap.get(date) || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        exerciseCalories: 0,
      };

    current.calories +=
      number(meal.calories);

    current.protein +=
      number(meal.protein_g);

    current.carbs +=
      number(meal.carbs_g);

    current.fat +=
      number(meal.fat_g);

    current.fiber +=
      number(meal.fiber_g);

    dailyMap.set(
      date,
      current
    );
  }

  for (const activity of activities) {
    const date =
      activity.activity_date;

    if (!date) continue;

    const current =
      dailyMap.get(date) || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        exerciseCalories: 0,
      };

    current.exerciseCalories +=
      number(
        activity.calories_burned
      );

    dailyMap.set(
      date,
      current
    );
  }

  const dailyData =
    Array.from(
      dailyMap.entries()
    ).sort(([a], [b]) =>
      a.localeCompare(b)
    );

  return (
    <Document
      title="NutriTrack AI Progress Report"
      author="NutriTrack AI"
      subject="Health and fitness progress report"
    >
      {/* ========================================================
          PAGE 1
      ======================================================== */}

      <Page
        size="A4"
        style={styles.page}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>
              NutriTrack AI
            </Text>

            <Text
              style={styles.subtitle}
            >
              Your Health Companion
            </Text>
          </View>

          <Text
            style={styles.subtitle}
          >
            Progress Report
          </Text>
        </View>

        {/* TITLE */}

        <Text
          style={styles.reportTitle}
        >
          Health Progress Report
        </Text>

        <Text
          style={styles.reportPeriod}
        >
          {formatDate(from)} —{" "}
          {formatDate(to)}
        </Text>

        {/* SUMMARY */}

        <View style={styles.section}>
          <Text
            style={styles.sectionTitle}
          >
            Progress Summary
          </Text>

          <View
            style={styles.summaryGrid}
          >
            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Current Weight
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {round(
                  profile.currentWeight
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  kg
                </Text>
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Target Weight
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {round(
                  profile.targetWeight
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  kg
                </Text>
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Weight Change
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {weightChange > 0
                  ? "+"
                  : ""}
                {round(
                  weightChange
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  kg
                </Text>
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Logged Days
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {loggedDays}
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Avg Calories
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {Math.round(
                  averageCalories
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  kcal
                </Text>
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Avg Protein
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {Math.round(
                  averageProtein
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  g
                </Text>
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Exercise
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {Math.round(
                  totalExerciseCalories
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  kcal
                </Text>
              </Text>
            </View>

            <View
              style={styles.summaryCard}
            >
              <Text
                style={
                  styles.summaryLabel
                }
              >
                Exercise Time
              </Text>

              <Text
                style={
                  styles.summaryValue
                }
              >
                {Math.round(
                  totalExerciseMinutes
                )}{" "}
                <Text
                  style={
                    styles.summaryUnit
                  }
                >
                  min
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* NUTRITION TOTALS */}

        <View style={styles.section}>
          <Text
            style={styles.sectionTitle}
          >
            Nutrition Summary
          </Text>

          <View
            style={styles.table}
          >
            <View
              style={
                styles.tableHeader
              }
            >
              <View
                style={{
                  width: "25%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Nutrient
                </Text>
              </View>

              <View
                style={{
                  width: "25%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Total
                </Text>
              </View>

              <View
                style={{
                  width: "25%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Daily Target
                </Text>
              </View>

              <View
                style={{
                  width: "25%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Average / Day
                </Text>
              </View>
            </View>

            {[
              {
                name: "Calories",
                total: `${Math.round(
                  totalCalories
                )} kcal`,
                target: `${Math.round(
                  profile.calorieTarget
                )} kcal`,
                average: `${Math.round(
                  averageCalories
                )} kcal`,
              },

              {
                name: "Protein",
                total: `${round(
                  totalProtein
                )} g`,
                target: `${round(
                  profile.proteinTarget
                )} g`,
                average: `${round(
                  averageProtein
                )} g`,
              },

              {
                name: "Carbs",
                total: `${round(
                  totalCarbs
                )} g`,
                target: `${round(
                  profile.carbsTarget
                )} g`,
                average:
                  loggedDays > 0
                    ? `${round(
                        totalCarbs /
                          loggedDays
                      )} g`
                    : "0 g",
              },

              {
                name: "Fat",
                total: `${round(
                  totalFat
                )} g`,
                target: `${round(
                  profile.fatTarget
                )} g`,
                average:
                  loggedDays > 0
                    ? `${round(
                        totalFat /
                          loggedDays
                      )} g`
                    : "0 g",
              },

              {
                name: "Fiber",
                total: `${round(
                  totalFiber
                )} g`,
                target: `${round(
                  profile.fiberTarget
                )} g`,
                average:
                  loggedDays > 0
                    ? `${round(
                        totalFiber /
                          loggedDays
                      )} g`
                    : "0 g",
              },
            ].map(
              (
                item,
                index
              ) => (
                <View
                  key={item.name}
                  style={[
                    styles.tableRow,
                    index % 2 === 1
                      ? styles.tableRowAlt
                      : {},
                  ]}
                >
                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {item.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {item.total}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {item.target}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {item.average}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>
        </View>

        <Text
          style={styles.note}
        >
          This report contains records
          available in NutriTrack AI for
          the selected date range.
        </Text>

        <View style={styles.footer}>
          <Text
            style={styles.footerText}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.footerText}
          >
            Health Progress Report
          </Text>
        </View>
      </Page>

      {/* ========================================================
          DAILY SUMMARY
      ======================================================== */}

      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <Text
            style={styles.brand}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.subtitle}
          >
            Daily Summary
          </Text>
        </View>

        <Text
          style={styles.reportTitle}
        >
          Daily Nutrition & Activity
        </Text>

        <View
          style={{
            ...styles.section,
            marginTop: 18,
          }}
        >
          {dailyData.length === 0 ? (
            <Text
              style={styles.empty}
            >
              No daily records found for
              this date range.
            </Text>
          ) : (
            <View
              style={styles.table}
            >
              <View
                style={
                  styles.tableHeader
                }
              >
                <View
                  style={{
                    width: "15%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Date
                  </Text>
                </View>

                <View
                  style={{
                    width: "17%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Calories
                  </Text>
                </View>

                <View
                  style={{
                    width: "14%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Protein
                  </Text>
                </View>

                <View
                  style={{
                    width: "14%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Carbs
                  </Text>
                </View>

                <View
                  style={{
                    width: "12%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Fat
                  </Text>
                </View>

                <View
                  style={{
                    width: "12%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Fiber
                  </Text>
                </View>

                <View
                  style={{
                    width: "16%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Exercise
                  </Text>
                </View>
              </View>

              {dailyData.map(
                (
                  item,
                  index
                ) => (
                  <View
                    key={item[0]}
                    style={[
                      styles.tableRow,
                      index % 2 === 1
                        ? styles.tableRowAlt
                        : {},
                    ]}
                  >
                    <View
                      style={{
                        width: "15%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {formatDate(
                          item[0]
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "17%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {Math.round(
                          item[1]
                            .calories
                        )}{" "}
                        kcal
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "14%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          item[1]
                            .protein
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "14%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          item[1]
                            .carbs
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "12%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          item[1]
                            .fat
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "12%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          item[1]
                            .fiber
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "16%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {Math.round(
                          item[1]
                            .exerciseCalories
                        )}{" "}
                        kcal
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text
            style={styles.footerText}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.footerText}
          >
            Daily Nutrition Summary
          </Text>
        </View>
      </Page>

      {/* ========================================================
          MEALS
      ======================================================== */}

      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <Text
            style={styles.brand}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.subtitle}
          >
            Meal History
          </Text>
        </View>

        <Text
          style={styles.reportTitle}
        >
          Meals
        </Text>

        <Text
          style={styles.reportPeriod}
        >
          {formatDate(from)} —{" "}
          {formatDate(to)}
        </Text>

        <View style={styles.section}>
          {meals.length === 0 ? (
            <Text
              style={styles.empty}
            >
              No meals found for this
              date range.
            </Text>
          ) : (
            <View
              style={styles.table}
            >
              <View
                style={
                  styles.tableHeader
                }
              >
                <View
                  style={{
                    width: "13%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Date
                  </Text>
                </View>

                <View
                  style={{
                    width: "15%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Meal
                  </Text>
                </View>

                <View
                  style={{
                    width: "22%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Name
                  </Text>
                </View>

                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    kcal
                  </Text>
                </View>

                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Protein
                  </Text>
                </View>

                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Carbs
                  </Text>
                </View>

                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Fat
                  </Text>
                </View>

                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Fiber
                  </Text>
                </View>
              </View>

              {meals.map(
                (
                  meal,
                  index
                ) => (
                  <View
                    key={
                      meal.id
                    }
                    style={[
                      styles.tableRow,
                      index % 2 === 1
                        ? styles.tableRowAlt
                        : {},
                    ]}
                    wrap={false}
                  >
                    <View
                      style={{
                        width: "13%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {formatDate(
                          meal.meal_date
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "15%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {meal.meal_type}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "22%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {meal.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "10%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {number(
                          meal.calories
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "10%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          number(
                            meal.protein_g
                          )
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "10%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          number(
                            meal.carbs_g
                          )
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "10%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          number(
                            meal.fat_g
                          )
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "10%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {round(
                          number(
                            meal.fiber_g
                          )
                        )}{" "}
                        g
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text
            style={styles.footerText}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.footerText}
          >
            Meal History
          </Text>
        </View>
      </Page>

      {/* ========================================================
          ACTIVITIES + WEIGHT
      ======================================================== */}

      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <Text
            style={styles.brand}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.subtitle}
          >
            Activity & Weight
          </Text>
        </View>

        {/* ACTIVITIES */}

        <Text
          style={styles.reportTitle}
        >
          Activities
        </Text>

        <View style={styles.section}>
          {activities.length === 0 ? (
            <Text
              style={styles.empty}
            >
              No activities found for
              this date range.
            </Text>
          ) : (
            <View
              style={styles.table}
            >
              <View
                style={
                  styles.tableHeader
                }
              >
                <View
                  style={{
                    width: "17%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Date
                  </Text>
                </View>

                <View
                  style={{
                    width: "17%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Type
                  </Text>
                </View>

                <View
                  style={{
                    width: "30%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Activity
                  </Text>
                </View>

                <View
                  style={{
                    width: "18%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Duration
                  </Text>
                </View>

                <View
                  style={{
                    width: "18%",
                  }}
                >
                  <Text
                    style={
                      styles.cellHeader
                    }
                  >
                    Calories
                  </Text>
                </View>
              </View>

              {activities.map(
                (
                  activity,
                  index
                ) => (
                  <View
                    key={
                      activity.id
                    }
                    style={[
                      styles.tableRow,
                      index % 2 === 1
                        ? styles.tableRowAlt
                        : {},
                    ]}
                    wrap={false}
                  >
                    <View
                      style={{
                        width: "17%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {formatDate(
                          activity.activity_date
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "17%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {
                          activity.activity_type
                        }
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "30%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {
                          activity.activity_name
                        }
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "18%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {
                          activity.duration_minutes
                        }{" "}
                        min
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "18%",
                      }}
                    >
                      <Text
                        style={
                          styles.cell
                        }
                      >
                        {
                          activity.calories_burned
                        }{" "}
                        kcal
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          )}
        </View>

        {/* WEIGHT */}

        <Text
          style={[
            styles.sectionTitle,
            {
              marginTop: 25,
            },
          ]}
        >
          Weight History
        </Text>

        {weightLogs.length === 0 ? (
          <Text
            style={styles.empty}
          >
            No weight records found for
            this date range.
          </Text>
        ) : (
          <View
            style={styles.table}
          >
            <View
              style={
                styles.tableHeader
              }
            >
              <View
                style={{
                  width: "25%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Date
                </Text>
              </View>

              <View
                style={{
                  width: "25%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Weight
                </Text>
              </View>

              <View
                style={{
                  width: "50%",
                }}
              >
                <Text
                  style={
                    styles.cellHeader
                  }
                >
                  Note
                </Text>
              </View>
            </View>

            {sortedWeights.map(
              (
                weight,
                index
              ) => (
                <View
                  key={
                    weight.id
                  }
                  style={[
                    styles.tableRow,
                    index % 2 === 1
                      ? styles.tableRowAlt
                      : {},
                  ]}
                >
                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {formatDate(
                        weight.recorded_at
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {round(
                        number(
                          weight.weight_kg
                        )
                      )}{" "}
                      kg
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Text
                      style={
                        styles.cell
                      }
                    >
                      {weight.note ||
                        "—"}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>
        )}

        <View style={styles.footer}>
          <Text
            style={styles.footerText}
          >
            NutriTrack AI
          </Text>

          <Text
            style={styles.footerText}
          >
            Generated for the selected date range
          </Text>
        </View>
      </Page>
    </Document>
  );
}

