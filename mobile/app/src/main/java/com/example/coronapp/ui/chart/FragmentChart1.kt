package com.example.coronapp.ui.chart

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.utils.APICall
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.AxisBase
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.github.mikephil.charting.formatter.ValueFormatter
import org.json.JSONObject

class FragmentChart1 : Fragment() {


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_chart, container, false)
        Thread.sleep(1_000);
        val data = APICall.instance.getGraph();
        println(data)
        if (data == null) {
            return root
        }
        setBaseChartValue(root, data)
        return root
    }

    private fun setBaseChartValue(root: View?, data : JSONObject?) {
        val dataObjects = mutableListOf<Int>()
        val date = mutableListOf<String>()
        if (data == null)
            return
        println(data);
        val i: Iterator<String> = data.keys()
        while (i.hasNext()) {
            val key = i.next()
            val value = data.get(key).toString().toInt()
            dataObjects.add(value);
            date.add(key)
        }
        val chart = root!!.findViewById(R.id.chart) as LineChart

        val entries: MutableList<Entry> =
            ArrayList()
        for (i in dataObjects.indices) {
            entries.add(Entry(i.toFloat(), dataObjects[i].toFloat()))
        }

        val dataSet = LineDataSet(entries, "General Confirmed Cases");
        dataSet.color = Color.YELLOW
        dataSet.valueTextColor = Color.RED

        val lineData = LineData(dataSet)
        chart.data = lineData
        chart.invalidate()
        // the labels that should be drawn on the XAxis
        val formatter: ValueFormatter =
            object : ValueFormatter() {
                override fun getAxisLabel(value: Float, axis: AxisBase): String {
                    return date[value.toInt()]
                }
            }
        chart.xAxis.granularity = 0.01f
        chart.xAxis.valueFormatter = formatter
        chart.invalidate()
    }


}