package com.example.coronapp.ui.deathList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ListView
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.coronapp.MainActivity
import com.example.coronapp.R
import com.example.coronapp.utils.APICall
import com.example.coronapp.utils.ListDto
import org.json.JSONObject

class DeathListFragmentRecovered : Fragment() {
    private var listView: ListView? = null;
    private val http = APICall.instance

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_death_list_recovered, container, false)
        listView = root.findViewById(R.id.listDeath)
        getTotalConfirmed(root)

        var adapter = DeathListAdapter(
            context as MainActivity,
            generateData(root),
            true
        )
        listView?.adapter = adapter
        adapter.notifyDataSetChanged()
        return root
    }

    private fun generateData(root: View?): ArrayList<ListDto> {
        var result = ArrayList<ListDto>()
        var allData : JSONObject? = http.getData()

        if (allData == null)
            root!!.findViewById<TextView>(R.id.totalDeathNb).text = "Unable to resolve data"
        allData = allData?.getJSONObject("countries")
        val i: Iterator<String> = allData!!.keys()
        while (i.hasNext()) {
            val key = i.next()
            val value = JSONObject(allData!!.get(key).toString())
            var country = ListDto(
                value.get("Province_State").toString(),
                key,
                value.get("Recovered").toString().toInt()
            )
            result.add(country)
        }
        return result
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
            root!!.findViewById<TextView>(R.id.totalDeathNb).text = "Unable to resolve data"
        allData = allData.getJSONObject("countries")
        val i: Iterator<String> = allData!!.keys()
        while (i.hasNext()) {
            val key = i.next()
            val value = JSONObject(allData!!.get(key).toString())
            if (key == "Total") {
                nb = value.get("Recovered").toString()
            }
        }
        root!!.findViewById<TextView>(R.id.totalDeathNb).text = nb
    }
}