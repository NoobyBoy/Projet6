package com.example.coronapp.ui.confirmedList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ListView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.example.coronapp.MainActivity
import com.example.coronapp.R
import com.example.coronapp.utils.APICall
import com.example.coronapp.utils.ListDto
import org.json.JSONObject

class ListFragmentAdmin2 : Fragment() {
    private var listView: ListView? = null;
    private val http = APICall.instance

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_confirmed_list_admin2, container, false)
        listView = root.findViewById(R.id.listConfirmed)

        var adapter = SecondListConfirmedAdapter(context as MainActivity, generateData())
        listView?.adapter = adapter
        adapter.notifyDataSetChanged()

        return root
    }
    private fun generateData(): ArrayList<ListDto> {
        var result = ArrayList<ListDto>()
        var allData : JSONObject?
        var it = 0;

        do {
            allData = http.getData()
            it++
        } while (allData == null && it < 1000)

        if (allData == null)
            return result

        allData = allData?.getJSONObject("zones")
        val i: Iterator<String> = allData!!.keys()
        while (i.hasNext()) {
            val key = i.next()
            val value = JSONObject(allData.get(key).toString())
            val region = value.get("Country_Region").toString()
            if (region == "US" || region == "China") {
                var country = ListDto(
                    region,
                    key,
                    value.get("Confirmed").toString().toInt()
                )
                result.add(country)
            }
        }
        return result
    }
}