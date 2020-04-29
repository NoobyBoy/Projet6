package com.example.coronapp.ui.chart

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.utils.APICall
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.AxisBase
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.github.mikephil.charting.formatter.ValueFormatter
import kotlinx.android.synthetic.main.fragment_chart.*
import org.json.JSONObject


class FragmentChart : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_chart, container, false)

        setChartValue(root, null)
        return root
    }

    fun Fragment.hideKeyboard() {
        view?.let { activity?.hideKeyboard(it) }
    }

    fun Context.hideKeyboard(view: View) {
        val inputMethodManager = getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
        inputMethodManager.hideSoftInputFromWindow(view.windowToken, 0)
    }

    override fun onStart() {
        super.onStart()
        chart.visibility = View.GONE
        searchBuuton.setOnClickListener {
            APICall.instance.fetchFor("countries/${searchBar.text}")
            searchBar.visibility = View.GONE
            searchBuuton.visibility = View.GONE
            hideKeyboard()
            Thread.sleep(1_000);
            chart.visibility = View.VISIBLE
            val data = APICall.instance.getDataFor();
            setChartValue(view, data);
        }
    }

    private fun setChartValue(root: View?, data : JSONObject?) {
        val dataObjects = mutableListOf<Int>()
        if (data != null) {
            println(data);
            val list = data.getJSONArray("History");
            for (i in 0 until list.length()) {
                val item = list.getInt(i)
                dataObjects.add(item);
                // Your code here
            }
        }
        val chart = root!!.findViewById(R.id.chart) as LineChart

        val entries: MutableList<Entry> =
            ArrayList()
        for (i in dataObjects.indices)  {
            entries.add(Entry(i.toFloat(), dataObjects[i].toFloat()))
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