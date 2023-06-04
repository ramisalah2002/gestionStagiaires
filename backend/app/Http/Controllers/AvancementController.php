<?php

namespace App\Http\Controllers;

use App\Models\Avancement;
use Illuminate\Http\Request;

class AvancementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avancement = Avancement::all();
        return response()->json($avancement);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $avancement = new Avancement([
            'date' => $request->input('date'),
            'text' => $request->input('text'),
            'projet_id' => $request->input('projet_id'),
        ]);
        $avancement->save();
        return response()->json('');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $avancement = Avancement::find($id) ;
        return response()->json($avancement);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $avancement = Avancement::find($id);
        $avancement->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $avancement = Avancement::find($id);
        $avancement->delete();
        return response()->json('');
    }
}
