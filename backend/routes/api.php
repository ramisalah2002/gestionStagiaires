<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Broadcast::routes();






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Authentification
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');

//Administrateur
Route::apiResource('administrateur',\App\Http\Controllers\AdministrateurController::class);

use App\Http\Controllers\MessageController;

Route::post('/messages', [MessageController::class, 'store']);
Route::get('/messages', [MessageController::class, 'index']);


//DemandeStage
Route::apiResource('demandeStage',\App\Http\Controllers\DemandeStageController::class);

//Encadrant
Route::apiResource('encadrant',\App\Http\Controllers\EncadrantController::class);


//image upload
Route::post('/images/upload', [ImageController::class, 'upload']);
Route::get('/images', [ImageController::class, 'index']);




//Presentation
Route::apiResource('presentation',\App\Http\Controllers\PresentationController::class);

//Projet
Route::apiResource('projet',\App\Http\Controllers\ProjetController::class);

//Rapport
Route::apiResource('rapport',\App\Http\Controllers\RapportController::class);

//Reunion
Route::apiResource('reunion',\App\Http\Controllers\ReunionController::class);

//Stage
Route::apiResource('stage',\App\Http\Controllers\StageController::class);

//Stagiaire
Route::apiResource('stagiaire',\App\Http\Controllers\StagiaireController::class);

//User
Route::apiResource('user',\App\Http\Controllers\UserController::class);

//Utilisateur
Route::apiResource('utilisateur',\App\Http\Controllers\UtilisateurController::class);

//Etablissement
Route::apiResource('etablissement',\App\Http\Controllers\EtablissementController::class);
//UseFull Requests

//getting stagiaires-with-stage
Route::get('/stagiaires-with-stage', [\App\Http\Controllers\StagiaireController::class, 'getStagiairesWithStage']);
