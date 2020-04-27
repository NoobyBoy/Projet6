package com.example.coronapp.ui.deathList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ListView
import androidx.fragment.app.Fragment
import com.example.coronapp.MainActivity
import com.example.coronapp.R
import com.example.coronapp.ListDto

class DeathListFragmentRecovered : Fragment() {
    private var listView: ListView? = null;

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_death_list_recovered, container, false)
        listView = root.findViewById(R.id.listDeath)

        var adapter = DeathListAdapter(
            context as MainActivity,
            generateData(),
            true
        )
        listView?.adapter = adapter
        adapter.notifyDataSetChanged()

        return root
    }

    private fun generateData(): ArrayList<ListDto> {
        var result = ArrayList<ListDto>()

        for (i in 0..9) {
            var country = ListDto(
                "Fr",
                "France",
                123456
            )
            result.add(country)
        }
        return result
    }
}