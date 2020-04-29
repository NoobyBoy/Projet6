package com.example.coronapp.ui.deathList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.utils.APICall
import com.example.coronapp.utils.TabLayoutAdapter
import kotlinx.android.synthetic.main.fragment_death_list.view.*
import org.json.JSONObject

class DeathListFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_death_list, container, false)

        val adapter =
            TabLayoutAdapter((activity as AppCompatActivity?)!!.supportFragmentManager)
        adapter.addFragment(DeathListFragmentDeaths(), "Deaths")
        adapter.addFragment(DeathListFragmentRecovered(), "Recovered")
        root.listDeathViewPager.adapter = adapter
        root.listDeathTabs.setupWithViewPager(root.listDeathViewPager)
        return root
    }
}
