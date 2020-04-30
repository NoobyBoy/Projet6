package com.example.coronapp.ui.chart

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.utils.TabLayoutAdapter
import kotlinx.android.synthetic.main.fragment_chart_tab.view.*

class FragmentTab : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_chart_tab, container, false)

        val adapter =
            TabLayoutAdapter((activity as AppCompatActivity?)!!.supportFragmentManager)
        adapter.addFragment(FragmentChart1(), "General")
        adapter.addFragment(FragmentChart(), "Search")
        root.ViewPager.adapter = adapter
        root.Tabs.setupWithViewPager(root.ViewPager)
        return root
    }
}
