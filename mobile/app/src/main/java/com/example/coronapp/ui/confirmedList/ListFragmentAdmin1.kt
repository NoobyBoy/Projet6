package com.example.coronapp.ui.confirmedList

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

class ListFragmentAdmin1 : Fragment() {
    private val http = APICall.instance
    private var listView: ListView? = null;

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_confirmed_list_admin1, container, false)
        listView = root.findViewById(R.id.listConfirmed)

        var adapter = ListConfirmedAdapter(context as MainActivity, generateData())
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
        } while (allData == null || it < 1000)

        allData = allData?.getJSONObject("countries")
        val i: Iterator<String> = allData!!.keys()
        while (i.hasNext()) {
            val key = i.next()
            val value = JSONObject(allData!!.get(key).toString())
            var country = ListDto(
                value.get("Province_State").toString(),
                key,
                value.get("Confirmed").toString().toInt()
            )
            result.add(country)
        }
        return result
    }
}