<?php

namespace App\Http\Controllers;

use App\Models\Equipe;
use Illuminate\Http\Request;

class EquipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipe = Equipe::all();
        return response()->json($equipe);
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
        $equipe = new Equipe([
            'nom_equipe' => $request->input('nom_equipe'),
            'encadrant_id' => $request->input('encadrant_id'),
        ]);
        $equipe->save();
        return response()->json('');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $equipe = Equipe::find($id) ;
        return response()->json($equipe);
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
        $equipe = Equipe::find($id);
        $equipe->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $equipe = Equipe::find($id);
        $equipe->delete();
        return response()->json('');
    }

    /*
     * Equipe Details
     */
    public function getEquipesDetails()
    {
        $equipes = Equipe::all();

        foreach($equipes as $equipe) {
            // Récupérer les stagiaires de l'équipe
            $stagiaires = $equipe->stagiaires()->with('stage', 'equipe.projets')->get();

            foreach($stagiaires as $stagiaire) {
                $stage = $stagiaire->stage;

                if ($stage) {
                    // Calcul des jours restants de stage
                    $date_fin_stage = new \DateTime($stage->date_debut);
                    $date_fin_stage->modify('+' . $stage->duree . ' months');
                    $now = new \DateTime();
                    $stage->jours_restants = $now->diff($date_fin_stage)->days;

                    // Calcul de la date de fin du stage
                    $stage->date_fin = $date_fin_stage->format('Y-m-d');

                    // Récupérer le projet du stage
                    $projet = $stage->projet;

                    if ($projet) {
                        // Récupérer les technologies utilisées dans le projet
                        $projet->technologies = $projet->technologies()->pluck('nom_technologie');

                        // Récupérer le progrès total du projet
                        $projet->progres_total = $projet->avancements()->count();
                    }
                }
            }

            // Ajouter les stagiaires et leurs détails à l'équipe
            $equipe->stagiaires = $stagiaires;

            // Récupérer les images des membres de l'équipe
            $equipe->equipe_images = $equipe->stagiaires()->pluck('image');
        }

        return response()->json($equipes);
    }


}
