package com.example.coronapp.ui.confirmedList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.coronapp.R
import com.example.coronapp.TabLayoutAdapter
import kotlinx.android.synthetic.main.fragment_confirmed_list.view.*


class ListFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val root = inflater.inflate(R.layout.fragment_confirmed_list, container, false)

        val adapter =
            TabLayoutAdapter((activity as AppCompatActivity?)!!.supportFragmentManager)
        adapter.addFragment(ListFragmentAdmin1(), "Admin0")
        adapter.addFragment(ListFragmentAdmin2(), "Admin1")
        adapter.addFragment(ListFragmentAdmin3(), "Admin2")
        root.listConfirmedViewPager.adapter = adapter
        root.listConfirmedTabs.setupWithViewPager(root.listConfirmedViewPager)
        return root
    }

}