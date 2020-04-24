package com.example.coronapp.ui.tested

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.TabLayoutAdapter
import kotlinx.android.synthetic.main.fragment_tested.view.*

class TestedFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_tested, container, false)

        val adapter =
            TabLayoutAdapter((activity as AppCompatActivity?)!!.supportFragmentManager)
        adapter.addFragment(TestedListFragment(), "Tested")
        adapter.addFragment(HospitalizedListFragment(), "Recovered")
        root.ViewPager.adapter = adapter
        root.Tabs.setupWithViewPager(root.ViewPager)
        return root
    }}