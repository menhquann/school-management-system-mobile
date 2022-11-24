import React from "react";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
export default function CalendarScreen() {
    /**
     * By default Timetable renders one column.
     * This sets date for that column, by default equals to new Date().
     * Can be instance of Date or an ISO string.
     * Essentially, a shortcut for range {from: date, till: date}.
     */
    const [date] = React.useState(new Date());

    /**
     * If you would like to have multiple columns (e.g. from Monday to Sunday),
     * you can specify range of dates. Each day of said range will have its own column.
     *
     * 'from' and 'till', just like 'date', can be instances of Date or an ISO strings.
     *
     * It is safe to keep 'from' and 'till' in separate states if you need to
     * because Timetable only check if 'from' or 'till' had changed and
     * not the object that contains them.
     */
    const [from] = React.useState(moment().subtract(3, 'days').toDate());
    const [till] = React.useState(moment().add(3, 'days').toISOString());
    const range = { from, till };

    const [items] = React.useState([
        {
            title: 'Some event',
            startDate: moment().subtract(1, 'hour').toDate(),
            endDate: moment().add(1, 'hour').toDate(),
        },
    ]);

    return (
        <ScrollView>
            <Timetable
                // these two are required
                items={items}
                cardComponent={MyItemCard}

                // provide only one of these if you need to
                date={date} // optional
                range={range} // optional
            />
        </ScrollView>
    );
}

/**
 * Example item component
 * @param style Object with pre-calculated values, looks like {position: 'absolute', zIndex: 3, width: Number, height: Number, top: Number, left: Number}
 * @param item One of items supplied to Timetable through 'items' property
 * @param dayIndex For multiday items inicates current day index
 * @param daysTotal For multiday items indicates total amount of days
 */
export function MyItemCard({ style, item, dayIndex, daysTotal }) {
    return (
        <View style={{
            ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
            backgroundColor: 'red',
            borderRadius: 10,
            elevation: 5,
        }}>
            <Text>{item.title}</Text>
            <Text>{dayIndex} of {daysTotal}</Text>
        </View>
    );
}