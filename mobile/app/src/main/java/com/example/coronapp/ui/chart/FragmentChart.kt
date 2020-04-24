package com.example.coronapp.ui.chart

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.AxisBase
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.github.mikephil.charting.formatter.ValueFormatter


class FragmentChart : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_chart, container, false)

        setChartValue(root)
        return root
    }

    private fun setChartValue(root: View) {
        val dataObjects = mapOf("2-3-2020" to 123F, "2-4-2020" to 312F, "&é" to 756f, "5-4-2020" to 1223F)
        val chart = root.findViewById(R.id.chart) as LineChart

        val entries: MutableList<Entry> =
            ArrayList()
        var count: Float = 1F
        for (data in dataObjects) {
            entries.add(Entry(count, data.value))
            count += 1
        }
        val dataSet = LineDataSet(entries, "Confirmed Cases");
        dataSet.color = Color.YELLOW
        dataSet.valueTextColor = Color.RED

        val lineData = LineData(dataSet)
        chart.data = lineData
        chart.invalidate()
        // the labels that should be drawn on the XAxis
        /*val quarters = arrayOf("Q1", "Q2", "Q3", "Q4")
        val formatter: ValueFormatter =
            object : ValueFormatter() {
                override fun getAxisLabel(value: Float, axis: AxisBase): String {
                    return dataObjects.keys
                }
            }
        val xAxis: XAxis = mLineChart.getXAxis()
        xAxis.granularity = 0.01f // minimum axis-step (interval) is 1
        xAxis.valueFormatter = formatter*/
    }
}