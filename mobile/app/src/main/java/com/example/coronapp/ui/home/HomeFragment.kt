package com.example.coronapp.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.utils.APICall
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*

class HomeFragment : Fragment() {

    private val http = APICall.instance

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_home, container, false)
        val date = getCurrentDateTime()
        val dateInString = date.toString("M/d/yyyy HH:mm:ss")

        root.findViewById<TextView>(R.id.totalDeath).text = "0"
        root.findViewById<TextView>(R.id.lastUpdateDate).text = dateInString
        root.findViewById<TextView>(R.id.nbCountry).text = "185"
        getTotalConfirmed(root)
        return root
    }


    private fun getTotalConfirmed(root : View?) {
        var allData : JSONObject?
        var it = 0;

        do {
            allData = http.getData()
            it++
        } while (allData == null || it < 1000)
        var nb = "0"

        if (allData == null)
             root!!.findViewById<TextView>(R.id.totalDeath).text = "Unable to resolve data"
        allData = allData.getJSONObject("countries")
        val i: Iterator<String> = allData!!.keys()
        while (i.hasNext()) {
            val key = i.next()
            val value = JSONObject(allData!!.get(key).toString())
            if (key == "Total") {
                nb = value.get("Confirmed").toString()
            }
        }
        root!!.findViewById<TextView>(R.id.totalDeath).text = nb
    }

    private fun Date.toString(format: String, locale: Locale = Locale.getDefault()): String {
        val formatter = SimpleDateFormat(format, locale)
        return formatter.format(this)
    }

    private fun getCurrentDateTime(): Date {
        return Calendar.getInstance().time
    }
}
